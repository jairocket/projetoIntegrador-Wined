const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');

const BrotherhoodController = {

  //Get brotherhood page
  accessBrotherhood: async function(req, res) {
    const{id} = req.params;
    const brotherhood = await db.Brotherhood.findByPk(id);
    res.render('brotherhoodPage', { 
      title: "Confraria",
      style: "brotherhood", 
      user: req.session.user,
      brotherhood:brotherhood
     });
  },

  /*Creates a brotherhood */
  brotherhoodCreator: async (req, res) =>{ 
    let {
        name,  
        description, 
        brotherhood_picture_id,
        since 
        } = req.body;
        
    const brotherhood = await db.Brotherhood.create({
        name,  
        description, 
        brotherhood_picture_id, 
        since
    })

    let brotherhood_id = brotherhood.id
    const brotherhoodChancellor = await db.Brotherhood_User.create({
        brotherhood_id,
        user_id: req.session.id,
        chancellor: true
    })
      console.log(brotherhood)
      console.log(brotherhoodChancellor)
      return res.json(brotherhood)
    },

  //ADD new members (pesquisar create bulk)
    
    // addMembers: async (req, res) =>{
    //   const newMember = await db.Brotherhood_User.create({
    //     user_id,
    //     brotherhood_id,
    //     chancellor
    //   })
    // },

    
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