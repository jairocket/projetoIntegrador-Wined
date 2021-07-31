const db = require('../database/models');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

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
        
        return user;
    },
    uploadProfilePicture: async(req, res)=>{
        const file = req.file;
        if(!file){
          const error = new Error('Por favor, escolha uma foto!');
          error.httpStatusCode = 400
          return res.status(400)
        }else{
          let {id} = req.params
          let {filename} = req.file;
          await db.User.update({
            avatar_picture: filename
          },{
            where: {id}
          });
        }
    },
    uploadBackgroundPicture: async(req, res)=>{
        const file = req.file;
        if(!file){
          const error = new Error('Por favor, escolha uma foto!');
          error.httpStatusCode = 400
          return res.status(400)
        }else{
          let {id} = req.params
          let {filename} = req.file;
          await db.User.update({
            background_picture: filename
          },{
            where: {id}
          });
        }
    },

    passwordUpdator: async(req, res)=>{
      let {new_password, old_password} = req.body
      let hashedPassword = bcrypt.hashSync(new_password, 10);
      const user = await db.User.findOne({
        where: {
          id: req.session.user.id
        }
      });
      const validPassword = bcrypt.compareSync(old_password, user.password);
      if(!validPassword){
        return false
      }
      await db.User.update(
        {
          provider: false,
          password: hashedPassword
      }, {
        where: {
          id: req.session.user.id
        }
      });
      return true
    }
}

module.exports = UserService;