const db = require('../database/models');
const {Op} = require('sequelize');

const UserService ={
    getSessionUser: async(req, res)=>{
        const user_id = req.session.user.id;
        const {id} = req.params

        const user = await db.User.findByPk(user_id, {
            attributes: [
            'id',
            'name',
            'surname', 
            'description', 
            'avatar_picture', 
            'background_picture'
          ],
          include: {
              model: db.Brotherhood_User,
              as: 'chancellor',
              where: {[Op.and]: [
                  {users_id: user_id},
                  {brotherhood_id: id}
              ]}
          }
        });
        console.log(user)
        return user;
    },


}

module.exports = UserService;