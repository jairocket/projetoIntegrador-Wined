const db = require('../database/models');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');
const nodemailer = require('./nodemailerService');

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
    },
    passwordGenerator: async(req, res)=>{
      let { email } = req.body;     
      let new_password = Math.random().toString(36).slice(-8);
      let hashedPassword = bcrypt.hashSync(new_password, 10);
      console.log(new_password);
      const user = await db.User.findOne({
        where: {email}
      });
      console.log(new_password)
      const temporary = db.User.update(
        {
          provider: true,
          password: hashedPassword
        },{
          where: {
            id: user.id
          }
      });
      
        await nodemailer({
          to: email,
          subject: 'Senha temporária Wined+',
          text: `Olá ${user.name}! 

Aqui está sua senha temporária: ${new_password}.
Você vai precisar trocar a senha quando acessar sua conta novamente.

Abraços <3, 
Wined+ Team`
        });
        req.session.user = user
        return
    },
}

module.exports = UserService;