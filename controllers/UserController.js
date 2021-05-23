const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { check, validationResult, body } = require('express-validator');

let userJson = path.join("users.json")

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
    userLogger: (req,res)=>{
        let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));
        let {email, password} = req.body;
        for (usr of users){
            if((usr.email == email) && (bcrypt.compareSync(password, usr.password))){
                let user = {name: usr.name, surname: usr.surname, id: usr.id, userBio: usr.userBio}
                req.session.user = user
                console.log(req.session.user)
                res.redirect('/perfil')
                //res.send('ok');
            }    
        }
        res.status(401).send('não autorizado')    
   
    },
    profileEditorForm:(req, res)=>{
        res.render('profileEditor', { title: "Editar Perfil", style: "register", user: req.session.user })
    }

}

module.exports = UserController;