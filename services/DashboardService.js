const db = require('../database/models');
const {Op, fn} = require('sequelize');


const DashboardService = {
    getWines: async (req, res) =>{
        // let {parameter} = req.body;
        let { parameter } = req.query
        console.log(parameter)
        if(!parameter){
            const wines = await db.Wine.findAll()
            return(wines)
        }else{
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
        }
        
        
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
    },
    getMembers: async(req,res)=>{
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

        });
        return membersBrotherhoods
    }

}


module.exports = DashboardService