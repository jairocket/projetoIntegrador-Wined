const db = require('../database/models');
const {Op} = require('sequelize');

const BrotherhoodService = {

    getMembers: async(req, res)=>{
        await db.User.findAll({
            include: [
              {
                model: db.Brotherhood,
                as: 'brotherhoods',
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
      let fmembers = [];

      if(Array.isArray(members)){
        for(member of members){
          await db.User.findOne({
            where:{ email: member },
            attributes: ['id'],
            include: [
              {
                model: db.Brotherhood,
                as: 'brotherhoods',
                where: { id },
                required: true
              }
            ]
          }).then((result)=>{
            if(!result){
              fmembers.push(member)
            }
          });
        }
        if (fmembers.length === 0){
          req.flash('errorMessage', 'Confrade(s) já faz(em) parte desta confraria!');
          res.redirect(`/confraria/${id}`);
        }else{
          for(member of fmembers){
            await db.User.findOne({
              where:{email:member},
              attributes: ['id']
            }).then(async(result) =>{
              await db.Brotherhood_User.create({
                brotherhood_id: id,
                users_id: result.id,
                chancellor: false
              })
              req.flash('successMessage', 'Confrade(s) adicionado(s) com sucesso!');
              return res.redirect(`/confraria/${id}`);
            })
          }
        }
      }else{
        await db.User.findOne({
          where:{ email: members },
          attributes: ['id'],
          include: [
            {
              model: db.Brotherhood,
              as: 'brotherhoods',
              where: { id },
              required: true
            }
          ]
        }).then(async(result)=>{
            if(result){
              req.flash('errorMessage', 'Confrade(s) já faz(em) parte desta confraria!');
              return res.redirect(`/confraria/${id}`)
            }else{
              await db.User.findOne({
                where: {email: members},
                attributes: ['id']
              }).then(async(results)=>{
                await db.Brotherhood_User.create({
                  brotherhood_id: id,
                  users_id: results.id,
                  chancellor:false
                })
                req.flash('successMessage', 'Confrade(s) adicionado(s) com sucesso!');
                return res.redirect(`/confraria/${id}`) 
            }) 
          }
        })    
      }
    },

    chancellorSwitch: async(req, res)=>{
      let { id, m_id } = req.params;

      const member = await db.Brotherhood_User.findOne({
        attributes: [ 'chancellor' ],
        where: {
          [Op.and]: [
            { brotherhood_id: Number(id) },
            { users_id: Number(m_id) }
          ]
        }
      });

      if(member.chancellor){
        await db.Brotherhood_User.update({
          chancellor: false},{
          where:  {
            [Op.and]: [
              { brotherhood_id: Number(id) },
              { users_id: Number(m_id) }
            ]
          }
        })
      }else{
        await db.Brotherhood_User.update({
          chancellor: true},{
          where:  {
            [Op.and]: [
              { brotherhood_id: Number(id) },
              { users_id: Number(m_id) }
            ]
          }
        })
      }
    },

    deleteMember: async(req, res)=>{
        let { id, m_id } = req.params;
        const deleted = await db.Brotherhood_User.destroy({
            where: {
                [Op.and]: [
                  {brotherhood_id: Number(id)},
                  {users_id: Number(m_id)}, 
                ]
            }
        })
    }
    
}

module.exports = BrotherhoodService