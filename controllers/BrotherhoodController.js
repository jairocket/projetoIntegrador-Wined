const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');
const { promiseImpl } = require('ejs');
const BrotherhoodService = require('../services/BrotherhoodService');

const BrotherhoodController = {

  //Get brotherhood page
  accessBrotherhood: async function(req, res) {
    const{id} = req.params;
    const user_id = req.session.user.id;

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
          'profile_picture_id', 
          'background_picture_id'
        ]
      } 
    });

    const brotherhood ={
      name: bhood.name,
      since: bhood.since,
      createdAt: `${bhood.createdAt.getDate()}/${bhood.createdAt.getMonth()+1}/${bhood.createdAt.getFullYear()}`,
      since: `${bhood.since.getDate()}/${bhood.since.getMonth()+1}/${bhood.since.getFullYear()}`,
      description: bhood.description,
      id: bhood.id,
      members: bhood.users
    }  
    
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

    

    const user = await db.User.findByPk(user_id, {
      attributes: [
      'id',
      'name',
      'surname', 
      'description', 
      'profile_picture_id', 
      'background_picture_id'
    ]
  });

  res.json(bhood.users)
    // res.render('brotherhoodPage', { 
    //   title: "Confraria",
    //   style: "brotherhood", 
    //   user: user,
    //   brotherhood:brotherhood,
    //   count: count.count
    //  });  
  },

  /*Creates a brotherhood */
  brotherhoodCreator: async (req, res) =>{ 
    let {
        name,  
        description, 
        brotherhood_picture_id,
        since,
        members
    } = req.body;

    let fmembers = [];  
        
    const brotherhood = await db.Brotherhood.create({
        name,  
        description, 
        brotherhood_picture_id, 
        since
    });

    let id = brotherhood.id

    const brotherhoodChancellor = await db.Brotherhood_User.create({
        brotherhood_id: id,
        users_id: req.session.user.id,
        chancellor: true
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
            await db.Brotherhood_User.create({
              brotherhood_id: id,
              users_id: result.id,
              chancellor: false
            })
            req.flash('successMessage', 'Confrade(s) adicionado(s) com sucesso!');
            return res.redirect(`/confraria/${id}`);
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
              await db.Brotherhood_User.create({
                brotherhood_id: id,
                users_id: results.id,
                chancellor:false
              })
              req.flash('successMessage', 'Confrade(s) adicionado(s) com sucesso!');
              return res.redirect(`/confraria/${id}`) 
          }) 
        }
      })    
    }
      
      return res.redirect(`/confraria/${id}`)
    },

    updateView: async (req, res)=>{

      let { id } = req.params;
      
      const members = await db.User.findAll({
          include: [
            {
              model: db.Brotherhood,
              as: 'brotherhoods',
              where: {id},
              required: true,
              attributes: []
            }
          ],
          attributes: ['id', 'name', 'surname', 'profile_picture_id']
        });
        
        
      const chancellors = await db.Brotherhood_User.findAll({
        attributes: ['chancellor', 'users_id'],
        where:{
          brotherhood_id: id
        }
      });

      console.log(chancellors)
  
      res.render('brotherhoodEditor', {
          id: req.params.id,
          user: req.session.user, 
          members: members,
          chancellors,
          title: 'Editar Confraria', 
          style: 'register'})
  },

    update: async (req, res) =>{
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
      res.redirect('/dashboard')
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
      attributes: ['id', 'name', 'surname', 'email', 'profile_picture_id']
    })
    
    return res.json(brotherhoodMembers)
    }


}
module.exports = BrotherhoodController