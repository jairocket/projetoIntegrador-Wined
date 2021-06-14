const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');
const { promiseImpl } = require('ejs');

const BrotherhoodController = {

  //Get brotherhood page
  accessBrotherhood: async function(req, res) {
    const{id} = req.params;
    const user_id = req.session.user.id;

    const bhood = await db.Brotherhood.findByPk(id, {
      attributes:['name', 'since', 'createdAt', 'description', 'id']});
    const brotherhood ={
      name: bhood.name,
      since: bhood.since,
      createdAt: `${bhood.createdAt.getDate()}/${bhood.createdAt.getMonth()+1}/${bhood.createdAt.getFullYear()}`,
      //since: `${bhood.since.getDate()}/${bhood.since.getMonth()}/${bhood.since.getFullYear()}`,
      description: bhood.description,
      id: bhood.id
    }
    
    const count = await db.User.findAndCountAll({
      include: [
        {
          model: db.Brotherhood,
          where: {id},
          required: true,
          attributes: []
        }
      ],
     attributes: [] 
    });
    
    const members = await db.User.findAll({
      include: [
        {
          model: db.Brotherhood,
          where: {id},
          required: true,
          attributes: []
        }
      ],
      attributes: ['id', 'name', 'surname', 'profile_picture_id']
    });

    const user = await db.User.findByPk(user_id, {attributes: [
      'id',
      'name',
      'surname', 
      'description', 
      'profile_picture_id', 
      'background_picture_id'
    ]
  });
    res.render('brotherhoodPage', { 
      title: "Confraria",
      style: "brotherhood", 
      user,
      brotherhood:brotherhood,
      members: members,
      count: count.count
     });
     
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
        
        const brotherhood = await db.Brotherhood.create({
        name,  
        description, 
        brotherhood_picture_id, 
        since
    });

    let brotherhood_id = brotherhood.id
    const brotherhoodChancellor = await db.Brotherhood_User.create({
        brotherhood_id,
        users_id: req.session.user.id,
        chancellor: true
    });

    const membersIds =  members.map(async function(member) {
      await db.User.findOne({
        where:{
          email: member
        },
        attributes:['id']
      })
    });


    Promise.resolve(membersIds).then(membersIds.forEach(async(memberId) => {
      await db.Brotherhood_User.create({
        brotherhood_id,
        users_id: memberId.id,
        chancellor: false
      })
      
    })) ;
    
      

      return res.redirect('/dashboard')
    },

  //ADD new members (pesquisar create bulk)

  
    
    addMembers: async (req, res) =>{
     
      
      const addMember = await db.Brotherhood_User.create({


    })
  },

    
//GET brotherhood's members
getMembers: async (req, res) =>{
    let id = req.params.id;
    const brotherhoodMembers = await db.User.findAll({
      include: [
        {
          model: db.Brotherhood,
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