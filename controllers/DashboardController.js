const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');


const DashboardController ={

    // GET member's brotherhoods
    getBrotherhoods: async(req,res)=>{
        let id = req.session.user.id;
        const membersBrotherhoods = await db.Brotherhood.findAll({
            attributes: ['id', 'name', 'description', 'since', 'createdAt'],
            include: [
                {
                    model: db.User,
                    where: {id},
                    required:true,
                    attributes: [],
                },  
            ],     
        })

        const user = await db.User.findByPk(id, {
            attributes: [
                'id',
                'name',
                'surname', 
                'description', 
                'profile_picture_id', 
                'background_picture_id'
            ]
        })

    return res.render(
        'dashboard', {
        title: "Dashboard",
        style: "dashboard",
        brotherhoods: membersBrotherhoods,
        user,
        
        }
     )
}

}



module.exports = DashboardController