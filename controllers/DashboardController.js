const db = require('../database/models');
const Sequelize = require('sequelize');
const { check, validationResult, body } = require('express-validator');

const DashboardService = require('../services/DashboardService');
const UserController = require('./UserController');

const DashboardController ={

    // GET member's brotherhoods
    getBrotherhoods: async(req,res)=>{
        let id = req.session.user.id;
        let avatar = req.session.user.avatar_picture
        const membersBrotherhoods = await DashboardService.getMembers(req, res);
        const events = await DashboardService.getUserEvents(req, res)
        // res.json(events)

        const user = await db.User.findByPk(id, {
            attributes: [
                'id',
                'name',
                'surname', 
                'description', 
                'avatar_picture', 
                'background_picture'
            ]
        });
       
    return res.render(
        'dashboard', {
            title: "Dashboard",
            style: "dashboard",
            brotherhoods: membersBrotherhoods,
            user,
            avatar,
            events
        }
     )
    },

    getWines: async (req, res)=>{
        const avatar = req.session.user.avatar_picture
        const membersBrotherhoods = await DashboardService.getMembers(req, res);
        const wines = await DashboardService.getWines(req, res);
        const user = await UserController.getUser(req, res);
        return res.render(
            'wines', {
                title: "Dashboard",
                style: "dashboard",
                brotherhoods: membersBrotherhoods,
                user,
                wines, 
                avatar            
            }
         )     
    },

    favorite: async(req, res)=>{
        await DashboardService.favoriteWine(req, res);
        return res.status(200)
    },

    wish: async(req, res)=>{
        await DashboardService.wishWine(req, res);
        res.status(200)
    },

    getUserEvents: async(req, res)=>{
        
        
    }

}



module.exports = DashboardController