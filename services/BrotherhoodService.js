const db = require('../database/models');
const {Op, fn} = require('sequelize');
const nodemailer = require('../services/nodemailerService');
const { sequelize } = require('../database/models');

const BrotherhoodService = {
    getBrotherhood: async(req, res)=>{
      const{id} = req.params;

      const bhood = await db.Brotherhood.findByPk(id, {
      attributes:['name', 'since', 'createdAt', 'description', 'id'],
      
        include: {
          model: db.User,
          as: 'users', 
          attributes:[
            'name', 
            'surname', 
            'id', 
            'description', 
            'avatar_picture', 
            'background_picture'
          ],
          include: {
            model: db.Brotherhood_User,
            where: {brotherhood_id: id},
            as: "chancellor",
            attributes: ['chancellor']
          }
        }  
      });

      const brotherhood ={
        name: bhood.name,
        since: bhood.since,
        createdAt: `${bhood.createdAt.getDate()}/${bhood.createdAt.getMonth()+1}/${bhood.createdAt.getFullYear()}`,
        since: `${bhood.since.getDate()}/${bhood.since.getMonth()+1}/${bhood.since.getFullYear()}`,
        description: bhood.description,
        id: bhood.id,
        members: bhood.users,
        chancellor: bhood.users.chancellor
      };
      return brotherhood
    },

    getCount: async(req, res)=>{
      const{id} = req.params;
      
      const count = await db.User.findAndCountAll({
        include: [
          {
            model: db.Brotherhood,
            as: 'brotherhoods',
            where: {id},
            required: true,
            attributes: []
          }
        ],
       attributes: [] 
      });
      return count
    },

    getMembers: async(req, res)=>{
      let { id } = req.params;
      const members = await db.Brotherhood_User.findAll({
        where:{ brotherhood_id: id },
        attributes:['chancellor'],
        include: [
          {
            model: db.User,
            as: 'users',
            attributes: ['id', 'name', 'surname', 'avatar_picture']
          }
        ]
      });
      return members;    
    },

    update: async(req,res)=>{
      let { id } = req.params;
      let {
        name,  
        description, 
        since,
        } = req.body;
      const brotherhood = await db.Brotherhood.update({
        name,
        description,
        since
      },{ 
        where:{ id }
      });
    },

    addMembers: async(req, res)=>{

      let { members } = req.body;
      let { id } = req.params;
      let fmembers = [];
      let users_id = req.session.user.id;

      const inviter = await db.User.findByPk(users_id, {
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
          req.flash('errorMessage', 'Confrade(s) já faz(em) parte desta confraria!');
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

    chancellorSwitch: async(req, res)=>{
      let { id, m_id } = req.params;

      const member = await db.Brotherhood_User.findOne({
        attributes: [ 'chancellor' ],
        where: {
          [Op.and]: [
            { brotherhood_id: Number(id) },
            { users_id: Number(m_id) }
          ]
        }
      });

      const chancellors = await db.Brotherhood_User.findAndCountAll({
        where: {
          [Op.and]: [
            {brotherhood_id: Number(id)},
            {chancellor: true}
          ]
        } 
      })
    
      if(chancellors.count > 1){
        if(member.chancellor){
          await db.Brotherhood_User.update({
            chancellor: false},{
            where:  {
              [Op.and]: [
                { brotherhood_id: Number(id) },
                { users_id: Number(m_id) }
              ]
            }
          })
        }else{
          await db.Brotherhood_User.update({
            chancellor: true},{
            where:  {
              [Op.and]: [
                { brotherhood_id: Number(id) },
                { users_id: Number(m_id) }
              ]
            }
          })
        }

      }else if(chancellors.count == 1){
        if(!member.chancellor){
          await db.Brotherhood_User.update({
            chancellor: true},{
            where:  {
              [Op.and]: [
                { brotherhood_id: Number(id) },
                { users_id: Number(m_id) }
              ]
            }
          });
        }else{
          return res.redirect('/confraria/chancellorRequired')
        }
      }
    },

    postText: async(req, res)=>{
      
      let  users_id = req.session.user.id;
      let {content, brotherhood_id, comment} = req.body
      
      const post = await db.Post.create({
        content,
        brotherhood_id,
        users_id,
        comment
      });

      res.redirect(`/confraria/${brotherhood_id}`)
    },

    postComment: async(req, res)=>{
      let  users_id = req.session.user.id;
      let {content, brotherhood_id, comment, ref_post_id} = req.body

      const post = await db.Post.create({
        content,
        brotherhood_id,
        users_id,
        comment
      });

      const commentary = await db.Post_Comment.create({
        ref_post_id: Number(ref_post_id),
        post_id: post.id
      });

      res.redirect(`/confraria/${brotherhood_id}`)
    },

    getPosts: async(req, res)=>{
      let {id} = req.params;
      const posts = await db.Post.findAll({
        order:[
          [
            'createdAt', 
            'DESC'
          ]
        ],
        include: 
        [
          {
            model: db.User,
            as: 'author',
            attributes: ['name', 'surname', 'avatar_picture', 'id']
          },
        {
          model: db.Post_Comment,
          as: "comments",
          order: [
            'createdAt', 
            'DESC'
          ],
          include: {
            model: db.Post,
            as: 'contents',
            attributes: ['content'],
            include: {
              model: db.User,
              as: "author",
              attributes: ['name', 'surname', 'avatar_picture', 'id']
            }
          }, 
        }
      ],
        where: {
          [Op.and]: [
            {brotherhood_id: id},
            {comment: false}
          ]},
          nested: true
      });

      return(posts)

    },

    editPosts: async(req, res)=>{
      
      let {content, brotherhood_id, comment, ref_post_id} = req.body
      console.log(content);
      console.log(ref_post_id.trim());
      const changedPosts = await db.Post.findByPk(ref_post_id.trim()).then(
        post => post.update({
          content,
          brotherhood_id,
          comment,
          ref_post_id
        })
      );
      
      console.log(changedPosts)
      
    },

    deleteComments: async(req, res)=>{
      let {id} = req.body;
      const deleteComments = await db.Post_Comment.destroy({
        where: {ref_post_id: id.trim()}
      });

    },

    deletePosts: async(req, res)=>{
      let {id} = req.body; 
      const deleted = await db.Post.destroy({
        where: {id: id.trim()}
      })
    },

    deleteMember: async(req, res)=>{
        let { id, m_id } = req.params;
        const chancellor = await db.Brotherhood_User.findOne({
          where: { [Op.and]: [
            {brotherhood_id: Number(id)},
            {users_id: Number(m_id)}, 
          ]},
          attributes: ['chancellor']
        });

        const chancellors = await db.Brotherhood_User.findAndCountAll({
          where: { [Op.and]: [
            {brotherhood_id: Number(id)},
            {chancellor: true}, 
          ]},
        })

        if((chancellor.chancellor == true) && (chancellors.count == 1)){
          return res.redirect('/confraria/chancellorRequired')
        }else{
          const deleted = await db.Brotherhood_User.destroy({
            where: {
              [Op.and]: [
                {brotherhood_id: Number(id)},
                {users_id: Number(m_id)}
              ]
            }
          })
      }

    }
    
}

module.exports = BrotherhoodService


    // async(req, res)=>{
    //     await db.User.findAll({
    //         include: [
    //           {
    //             model: db.Brotherhood,
    //             as: 'brotherhoods',
    //             where: {id},
    //             required: true,
    //             attributes: []
    //           }
    //         ],
    //         attributes: ['id', 'name', 'surname', 'avatar_picture']
    //     });

         // const status = parseInt(member.chancellor) === 1

      // await db.Brotherhood_User.update({
      //   chancellor: !status},{
      //   where:  {
      //     [Op.and]: [
      //       { brotherhood_id: Number(id) },
      //       { users_id: Number(m_id) }
      //     ]
      //   }
      // })