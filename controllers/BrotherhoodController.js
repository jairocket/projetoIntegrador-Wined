const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');
const { promiseImpl } = require('ejs');
const BrotherhoodService = require('../services/BrotherhoodService');
const nodemailer = require('../services/nodemailerService');
const UserService = require('../services/UserService');



const BrotherhoodController = {

  //Get brotherhood page
  accessBrotherhood: async function(req, res) {

    const brotherhood = await BrotherhoodService.getBrotherhood(req, res); 
    const count = await BrotherhoodService.getCount(req, res);
    const user = await UserService.getSessionUser(req,res);
    const posts = await BrotherhoodService.getPosts(req, res);
    console.log(brotherhood)

    // res.json(brotherhood)
    
    res.render('brotherhoodPage', { 
      title: "Confraria",
      style: "brotherhood", 
      user: user,
      brotherhood:brotherhood,
      count: count.count,
      posts: posts
     });  
  },

  /*Creates a brotherhood */
  brotherhoodCreator: async (req, res) =>{ 
    let {
        name,  
        description, 
        brotherhood_picture,
        since,
        members
    } = req.body;

    let fmembers = [];  
        
    const brotherhood = await db.Brotherhood.create({
        name,  
        description, 
        brotherhood_picture, 
        since
    });

    let id = brotherhood.id

    const brotherhoodChancellor = await db.Brotherhood_User.create({
        brotherhood_id: id,
        users_id: req.session.user.id,
        chancellor: true
    });

    const inviter = await db.User.findByPk(brotherhoodChancellor.users_id, {
      attributes:['name', 'surname']
    });
    
    if(Array.isArray(members)){
      for(member of members){
        await db.User.findOne({
          where:{ email: member },
          attributes: ['id'],
          include: [
            {
              model: db.Brotherhood,
              as: 'brotherhoods',
              where: { id },
              required: true
            }
          ]
        }).then((result)=>{
          if(!result){
            fmembers.push(member)
          }
        });
      }
      if (fmembers.length === 0){
        req.flash('errorMessage', 'Confrade(s) já faz(em) parte desta confraria!')
        res.redirect(`/confraria/${id}`);
      }else{
        for(member of fmembers){
          await db.User.findOne({
            where:{email:member},
            attributes: ['id']
          }).then(async(result) =>{
            if(!result){
              await nodemailer({
                to: member,
                subject: "Convite Wined+",
                text: `Olá, ${member}! ${inviter.name} ${inviter.surname} está te convidando para participar da Wined+, uma rede social para amantes de vinho! Para participar, acesse http://localhost:3000/`,
              });
            }else{
              await db.Brotherhood_User.create({
                brotherhood_id: id,
                users_id: result.id,
                chancellor: false
              });
            }
          })
        }
              req.flash('successMessage', 'Confrade(s) adicionado(s) com sucesso!');
              return res.redirect(`/confraria/${id}`);
      }
    }else{
      await db.User.findOne({
        where:{ email: members },
        attributes: ['id'],
        include: [
          {
            model: db.Brotherhood,
            as: 'brotherhoods',
            where: { id },
            required: true
          }
        ]
      }).then(async(result)=>{
          if(result){
            req.flash('errorMessage', 'Confrade(s) já faz(em) parte desta confraria!');
            return res.redirect(`/confraria/${id}`)
          }else{
            await db.User.findOne({
              where: {email: members},
              attributes: ['id']
            }).then(async(results)=>{
              if(!results){
                await nodemailer({
                  to: members,
                  subject: "Convite Wined+",
                  text: `Olá, ${members}! ${inviter.name} ${inviter.surname} está te convidando para participar da Wined+, uma rede social para amantes de vinho! Para participar, acesse http://localhost:3000/`,
                });
              }else{
                await db.Brotherhood_User.create({
                  brotherhood_id: id,
                  users_id: results.id,
                  chancellor:false
                })
              }      
              req.flash('successMessage', 'Confrade(s) adicionado(s) com sucesso!');
              return res.redirect(`/confraria/${id}`) 
          }) 
        }
      })    
    }
      
    },

    updateView: async (req, res)=>{

      const members = await BrotherhoodService.getMembers(req, res);
      const brotherhood = await BrotherhoodService.getBrotherhood(req, res);

      res.render('brotherhoodEditor', {
          id: req.params.id,
          user: req.session.user,
          brotherhood:brotherhood, 
          members: members,
          title: 'Editar Confraria', 
          style: 'register'})
    },

    update: async (req, res) =>{
     
      await BrotherhoodService.update(req, res);
      res.redirect('/dashboard');

    },

    addMembers: async (req, res) =>{

      await BrotherhoodService.addMembers(req, res);
      const {id} = req.params
      res.redirect(`/confraria/${id}`)
      
    },

    deleteMember: async (req, res)=>{
      await BrotherhoodService.deleteMember(req, res)
      const { id } = req.params
      res.redirect(`/confraria/${id}`);      

    }, 
 
    delete: async (req, res) =>{ 
      let { id } = req.params; 
      const deleteMembers = await db.Brotherhood_User.destroy({
        where:{brotherhood_id: id}
      });
      const deleteBrotherhood = await db.Brotherhood.destroy({
        where:{id}
      });
      return res.redirect('/dashboard');
  },

  chancellorSwitch: async(req, res)=>{
    await BrotherhoodService.chancellorSwitch(req, res)
    const { id } = req.params;
    return res.redirect(`/confraria/editar/${id}`)

  },

  postContent: async(req, res)=>{
    await BrotherhoodService.postText(req, res)

  },

  postComment: async(req, res)=>{
    const posts = await BrotherhoodService.postComment(req, res)
    
  },

  editComment: async(req, res)=>{
    const changedPosts = await BrotherhoodService.editPosts(req, res);
   
  },

  deleteComment: async(req, res)=>{
    const changedPosts = await BrotherhoodService.deletePosts(req, res);
   
  },
 
//GET brotherhood's members
  getMembers: async (req, res) =>{
    let id = req.params.id;
    const brotherhoodMembers = await db.User.findAll({
      include: [
        {
          model: db.Brotherhood,
          as: 'brotherhoods',
          where: {id},
          required: true,
          attributes: []
        }
      ],
      attributes: ['id', 'name', 'surname', 'email', 'avatar_picture']
    })
    
    return res.json(brotherhoodMembers)
    }
}
module.exports = BrotherhoodController