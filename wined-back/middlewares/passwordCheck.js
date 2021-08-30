const db = require("../database/models");

async function passwordCheck(req, res, next){
    let id = req.session.user.id;
    const user = await db.User.findByPk(id,{
        atributes: ['provider']
    });
    console.log(user)
    user.provider ? res.redirect('/cadastrar/password') : next()
}

module.exports = passwordCheck



