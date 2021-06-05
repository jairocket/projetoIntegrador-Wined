const db = require("../database/models");

async function membershipCheck(req, res, next){
    let id = req.session.user.id;
    let brotherhood_id = req.params.id

    const isMember = await db.User.findByPk(id, {
        include: [
           {
               model: db.Brotherhood,
               where: {id: brotherhood_id},
               required: true
            }
        ]
    })
    if(isMember){
        next()
    }else{
        res.redirect('/dashboard')
    }
    
}

module.exports = membershipCheck