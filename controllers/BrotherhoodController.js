const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');

const BrotherhoodController = {

/*Creates a brotherhood */
brotherhoodCreator: async (req, res) =>{ 
    let {
        name,  
        description, 
        background_Pic,
        chancellor  
        } = req.body;
        
    const brotherhood = await db.Brotherhood.create({
        name,  
        description, 
        background_Pic, 
        chancellor
    })
      console.log(brotherhood)
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
    },

// GET member's brotherhoods
getBrotherhoods: async(req,res)=>{
    let {id} = req.params;
    const membersBrotherhoods = await db.User.findAll({
      include: [
        {
          model: db.Brotherhood,
          right: true
        },
        
      ],
      where:{id}
    })
    return res.json(membersBrotherhoods)
}
}
module.exports = BrotherhoodController