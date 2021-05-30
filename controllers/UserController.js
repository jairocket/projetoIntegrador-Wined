const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
<<<<<<< HEAD
const { v4: uuidv4 } = require('uuid');

=======
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
>>>>>>> 32baaca0307840e7a282f1a47b178cacd7de7d16
const { check, validationResult, body } = require('express-validator');

let UserController = {
    registerForm: (req, res)=>{
        res.render('register')
    },
    saveForm: async (req, res)=>{
        let errorsList = validationResult(req);
        if (errorsList.isEmpty()){
<<<<<<< HEAD
            let id = uuidv4();
            let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));
            let {email, name, surname, password, terms} = req.body;
            let hashedPassword = bcrypt.hashSync(password, 12);


            let user = {email, name, surname, terms, password: hashedPassword, id: uuidv4()};

            users.push(user);
            users = JSON.stringify(users, null, 2);
            fs.writeFileSync(userJson, users);
            res.send('usuário cadastrado com sucesso!');
=======
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
>>>>>>> 32baaca0307840e7a282f1a47b178cacd7de7d16
        }else{
            console.log(errorsList)
            res.render("register", {errors: errorsList.errors});
        }
        
    },
    loginForm: (req, res)=>{
        res.render('login')
    },
<<<<<<< HEAD
    userLogger: (req,res)=>{
        let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));
        let {email, password} = req.body;
        for (user of users){
            if((user.email == email) && (bcrypt.compareSync(password, user.password))){

                req.session.user = user
                res.redirect('/perfil')
                //res.send('ok');
            }
            req.session.user = user

=======
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
>>>>>>> 32baaca0307840e7a282f1a47b178cacd7de7d16
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