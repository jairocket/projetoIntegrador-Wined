const db = require('../database/models')
const Sequelize = require('sequelize')
const { check, validationResult, body } = require('express-validator')
const { promiseImpl } = require('ejs')
const BrotherhoodService = require('../services/BrotherhoodService')
const nodemailer = require('../services/nodemailerService')
const UserService = require('../services/UserService')

const BrotherhoodController = {
  //Get brotherhood page
  accessBrotherhood: async function (req, res) {
    const avatar = req.session.user.avatar_picture
    const brotherhood = await BrotherhoodService.getBrotherhood(req, res)
    const count = await BrotherhoodService.getCount(req, res)
    const user = await UserService.getSessionUser(req, res)
    const posts = await BrotherhoodService.getPosts(req, res)
    const events = await BrotherhoodService.getEvents(req, res)

    // res.json(events)

    res.render('brotherhoodPage', {
      title: 'Confraria',
      style: 'brotherhood',
      user,
      brotherhood: brotherhood,
      count: count.count,
      posts: posts,
      avatar,
      events,
    })
  },

  /*Creates a brotherhood */
  brotherhoodCreator: async (req, res) => {
    const { name, description, brotherhood_picture, since, members } = req.body

    const brotherhood = await db.Brotherhood.create({
      name,
      description,
      brotherhood_picture,
      since,
    })

    const brotherhood_id = brotherhood.id
    const users_id = req.session.user.id

    BrotherhoodService.createChancellor(brotherhood_id, users_id)

    if (members) {
      await BrotherhoodService.addMembers(req, res, brotherhood_id)
    }
    return res.redirect(`/confraria/${brotherhood_id}`)
  },

  updateView: async (req, res) => {
    const avatar = req.session.user.avatar_picture
    const members = await BrotherhoodService.getMembers(req, res)
    const brotherhood = await BrotherhoodService.getBrotherhood(req, res)

    res.render('brotherhoodEditor', {
      id: req.params.id,
      user: req.session.user,
      brotherhood: brotherhood,
      members: members,
      avatar,
      title: 'Editar Confraria',
      style: 'register',
    })
  },

  update: async (req, res) => {
    let { id } = req.params
    await BrotherhoodService.update(req, res)
    res.redirect(`/confraria/${id}`)
  },

  addMembers: async (req, res) => {
    const { id } = req.params
    await BrotherhoodService.addMembers(req, res, id)
    return res.redirect(`/confraria/${id}`)
  },

  deleteMember: async (req, res) => {
    await BrotherhoodService.deleteMember(req, res)
    const { id } = req.params
    res.redirect(`/confraria/${id}`)
  },

  delete: async (req, res) => {
    let { id } = req.params
    const deleteMembers = await db.Brotherhood_User.destroy({
      where: { brotherhood_id: id },
    })
    const deleteBrotherhood = await db.Brotherhood.destroy({
      where: { id },
    })
    return res.redirect('/dashboard')
  },

  chancellorSwitch: async (req, res) => {
    await BrotherhoodService.chancellorSwitch(req, res)
    const { id } = req.params
    return res.redirect(`/confraria/editar/${id}`)
  },

  postContent: async (req, res) => {
    await BrotherhoodService.postText(req, res)
  },

  postBackground: async (req, res) => {
    let { id } = req.params
    await BrotherhoodService.postBackground(req, res)
    res.redirect(`/confraria/${id}`)
  },

  postMidia: async (req, res) => {
    let { content } = req.body
    let { id } = req.params
    let comment = false
    let users_id = req.session.user.id

    const post = await db.Post.create({
      content,
      brotherhood_id: id,
      users_id,
      comment,
    })

    let file = req.file
    if (!file) {
      return res.redirect(`/confraria/${id}`)
    } else {
      let { filename, mimetype } = req.file
      const postMidia = await db.Post_Midia.create({
        midia_type: mimetype.split('/')[0],
        post_id: post.id,
        midia_path: filename,
      })
      return res.redirect(`/confraria/${id}`)
    }
  },

  postComment: async (req, res) => {
    const posts = await BrotherhoodService.postComment(req, res)
  },

  editComment: async (req, res) => {
    const changedPosts = await BrotherhoodService.editPosts(req, res)
    res.status(200).json({ mensagem: 'atualizado com sucesso!' })
  },

  deleteComments: async (req, res) => {
    const deleteComment = await BrotherhoodService.deleteComments(req, res)
    res.status(204).json({ mensagem: 'atualizado com sucesso!' })
  },

  deletePosts: async (req, res) => {
    // const deleteComments = await BrotherhoodService.deleteComments(req, res);
    const deleteReactions = await BrotherhoodService.deleteReactions(req, res)
    const deletePosts = await BrotherhoodService.deletePosts(req, res)
    res.status(204).json({ mensagem: 'atualizado com sucesso!' })
  },

  reactionsSwitch: async (req, res) => {
    const reaction = await BrotherhoodService.reactionsSwitch(req, res)
    let brotherhood_id = req.body
    return res.redirect(`/confraria/${brotherhood_id}`)
  },

  //GET brotherhood's members
  getMembers: async (req, res) => {
    let id = req.params.id
    const brotherhoodMembers = await db.User.findAll({
      include: [
        {
          model: db.Brotherhood,
          as: 'brotherhoods',
          where: { id },
          required: true,
          attributes: [],
        },
      ],
      attributes: ['id', 'name', 'surname', 'email', 'avatar_picture'],
    })

    return res.json(brotherhoodMembers)
  },

  eventCreator: async (req, res) => {
    let { id } = req.params

    const event = await BrotherhoodService.eventCreator(req, res)
    const members = await BrotherhoodService.getMembers(req, res)
    const date = new Date(req.body.date)
    const postText = `Evento ${
      event.name
    } criado para o dia ${new Intl.DateTimeFormat('pt-BR').format(date)}.
Encontro vocês em ${event.street}, ${event.number}, ${event.complement}, ${
      event.city
    }/${event.state}, às ${req.body.time}.
CEP ${event.cep}.`

    members.forEach(async (member) => {
      await db.User_Event.create({
        events_id: event.id,
        users_id: member.users.id,
      })
    })

    await db.Post.create({
      brotherhood_id: id,
      users_id: req.session.user.id,
      content: postText,
      comment: false,
    })
    return res.redirect(`/confraria/${id}`)
  },
  deleteEvent: async (req, res) => {
    let { id } = req.params
    const event = await db.Event.findByPk(id)
    let brotherhood_id = event.brotherhood_id
    const deleted = await BrotherhoodService.deleteEvent(req, res)
    return res.redirect(`/confraria/${brotherhood_id}`)
  },

  editEvent: async (req, res) => {
    let { id } = req.params
    const avatar = req.session.user.avatar_picture
    const event = await db.Event.findByPk(id)
    res.render('eventEditor', {
      event,
      avatar,
      user: req.session.user,
      title: 'Cadastrar Eventos',
      style: 'register',
    })
  },

  updateEvent: async (req, res) => {
    let { id } = req.params
    const event = await db.Event.findByPk(id)
    let brotherhood_id = event.brotherhood_id
    const updated = BrotherhoodService.updateEvent(req, res)
    return res.redirect(`/confraria/${brotherhood_id}`)
  },
}
module.exports = BrotherhoodController
