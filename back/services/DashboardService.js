const db = require('../database/models');
const {Op, fn} = require('sequelize');


const DashboardService = {
    getWines: async (req, res) =>{
        // let {parameter} = req.body;
        let { parameter } = req.query
        
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
    getWineDetails: async(req, res)=>{
        let { id } = req.params;
        const wine = await db.Wine.findByPk(id);
        return(wine)

    },
    favoriteWine: async (req, res)=>{
        let {wine_id} = req.body;
        let users_id = req.session.user.id;
        const favorited = await db.Favorite_Wine.create({
            users_id,
            wine_id
        });
        return 
    },
    wishWine: async (req, res)=>{
        let {wine_id} = req.body;
        let users_id = req.session.user.id;
        const wished = await db.Wished_Wine.create({
            users_id,
            wine_id
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
    },

    getUserEvents: async(req, res)=>{
        let id = req.session.user.id;
        const events = []
        const raw_events = await db.Event.findAll({
            include: {
                model: db.User,
                as: 'users',
                where: {id},
                required: true,
                attributes: []
            }
        });
        
        raw_events.forEach(appointment => {
            
            let due_date = `${appointment.date.getDate()}/${appointment.date.getMonth()+1}/${appointment.date.getFullYear()}`
            let due_time = `${appointment.date.getHours()}:${appointment.date.getMinutes()}`
            const event = {
                id: appointment.id,
                name: appointment.name,
                street: appointment.street,
                cep: appointment.cep,
                complement: appointment.complement,
                number: appointment.number,
                city: appointment.city,
                state: appointment.state,
                date: due_date,
                time: due_time  
            }
            events.push(event)

        });          
        return events
    },
    missEvent: async (req, res)=>{
        let users_id = req.session.user.id;
        let { id } = req.params;
        await db.User_Event.destroy({
            where: {
                [Op.and]: [
                  { events_id: id },
                  { users_id }
                ]
            }
        });
        return
    }

}


module.exports = DashboardService