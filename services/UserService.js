const db = require('../database/models');
const {Op} = require('sequelize');

const UserService ={
    getSessionUser: async(req, res)=>{
        const user_id = req.session.user.id;

        const user = await db.User.findByPk(user_id, {
            attributes: [
            'id',
            'name',
            'surname', 
            'description', 
            'avatar_picture', 
            'background_picture'
          ]
        });

        return user;
    },


}

module.exports = UserService;