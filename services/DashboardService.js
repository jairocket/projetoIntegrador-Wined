const db = require('../database/models');
const {Op, fn} = require('sequelize');
const nodemailer = require('../services/nodemailerService');

const DashboardService = {
    getWines: async (req, res) =>{
        let {parameter} = req.body;
        const wines = await db.Wine.findAll({
            where: {
                [Op.or]: [
                    {
                        wine_slug: {
                            [Op.like]: parameter+'%'
                        }
                    },{
                        appellation_slug: {
                            [Op.like]: parameter+'%'
                        }
                    },{
                        color: {
                            [Op.like]: parameter+'%'
                        }
                    },{
                        regions: {
                            [Op.like]: parameter+'%'
                        }
                    },{
                        country: {
                            [Op.like]: parameter+'%'
                        }
                    },{
                        vintage: {
                            [Op.like]: parameter+'%'
                        }
                    }

                ]
            }
        });
        return(wines)
    },
    favoriteWine: async (req, res)=>{
        let {id} = req.params;
        let users_id = req.session.user.id;
        const favorited = await db.Favorite_Wine.create({
            users_id,
            wine_id: id
        });
        return 
    },
    wishWine: async (req, res)=>{
        let {id} = req.params;
        let users_id = req.session.user.id;
        const wished = await db.Wished_Wine.create({
            users_id,
            wine_id: id
        });
        return
    }

}


module.exports = DashboardService