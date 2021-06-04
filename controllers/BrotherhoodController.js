const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');

const BrotherhoodController = {

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
    const brotherhood_user = await db.Brotherhood_User.create({
        brotherhood_id,
        user_id: req.session.id,
        chancellor: true
    })
      console.log(brotherhood)
      console.log(brotherhood_user)
      return res.json(brotherhood)
    },
    
//GET brotherhood's members

getMembers: async (req, res) =>{
    let id = req.params.id;
    const brotherhoodMembers = await db.Brotherhood.findAll({
      include: [
        {model: db.User}
      ],
      where:{id} 
    })
    return res.json(brotherhoodMembers)
    }


}
module.exports = BrotherhoodController