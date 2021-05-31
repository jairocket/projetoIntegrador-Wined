const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { check, validationResult, body } = require('express-validator');

let UserController = {
    registerForm: (req, res)=>{
        res.render('register')
    },
    saveForm: async (req, res)=>{
        let errorsList = validationResult(req);
        if (errorsList.isEmpty()){
            let {
                email, 
                name, 
                surname,
                password,
                terms, 
                birthday, 
                description, 
                profilePicture, 
                backgroundPicture, 
                
            } = req.body;
            let hashedPassword = bcrypt.hashSync(password, 10);
          
            const results = await db.User.create({
                email,
                name, 
                surname, 
                terms, 
                password: hashedPassword, 
                birthday, 
                description, 
                profilePicture, 
                backgroundPicture, 
                
            })
            console.log(results)
            res.render('login')
        }else{
            console.log(errorsList)
            res.render("register", {errors: errorsList.errors});
        }
        
    },
    loginForm: (req, res)=>{
        res.render('login')
    },
    userLogger: async(req,res)=>{
        const {email, password} = req.body;
        const usr = await db.User.findOne({
            where: {email}
        })
        if ((usr.email == email) && (bcrypt.compareSync(password, usr.password))){
            const user = {
                name: usr.name,
                surname: usr.surname,
                description: usr.description, 
                id: usr.id, 
                email: usr.email
            }
            req.session.user = user;
            
            res.redirect('/perfil');
        }
        res.status(401).send('não autorizado')    
   
    },
    profileEditorForm: async (req, res)=>{
        const id = req.session.user.id;
        const user = await db.User.findByPk(id);
        return res.render('profileEditor', { title: "Editar Perfil", style: "register",  user})
    },
    profileEditor: async (req, res)=>{
        const id = req.session.user.id;
        const {name, surname, email, description} = req.body;
        const results = await db.User.update({
            name,
            surname,
            email,
            description
        },
        {
            where:{id},  
        })
        return res.redirect(
            '/perfil'
        ) 
    },
    delete: async (req, res)=>{
        const{id} = req.params;
    const results = await db.User.destroy({
        where:{id}
    })
        console.log(results)
        return res.json(results)
    }

}

module.exports = UserController;