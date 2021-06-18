const db = require('../database/models');

const BrotherhoodService = {

    getMembers: async(req, res)=>{
        await db.User.findAll({
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
    },

    addMembers: async(req, res)=>{
        let { members } = req.body;
        let { id } = req.params;
        for(member of members){
            await db.User.findOne({
              where:{email:member},
              attributes: ['id']
            }).then(async(result) =>{
              await db.Brotherhood_User.create({
                brotherhood_id: id,
                users_id: result.id,
                chancellor: false
              })
            })
        }
        return res.redirect('/dashboard') 
    }
    
}

module.exports = BrotherhoodService