const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');

const DashboardService = require('../services/DashboardService')

const DashboardController ={

    // GET member's brotherhoods
    getBrotherhoods: async(req,res)=>{
        let id = req.session.user.id;
        const membersBrotherhoods = await db.Brotherhood.findAll({
            attributes: ['id', 'name', 'description', 'since', 'createdAt'],
            include: [
                {
                    model: db.User,
                    as: 'users',
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
                'avatar_picture', 
                'background_picture'
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
    },

    getWines: async (req, res)=>{
        const wines = await DashboardService.getWines(req, res);
        res.json(wines);     
    }

}



module.exports = DashboardController