const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { check, validationResult, body } = require('express-validator');

let userJson = path.join("users.json")

let UserController = {
    registerForm: (req, res)=>{
        res.render('register')
    },
    saveForm: (req, res)=>{
        let errorsList = validationResult(req);
        if (errorsList.isEmpty()){
            let id = uuidv4();
            let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));
            let {email, name, surname, password, terms} = req.body;
            let hashedPassword = bcrypt.hashSync(password, 12);
            let user = {id,email, name, surname, terms, password: hashedPassword};
            users.push(user);
            users = JSON.stringify(users, null, 2);
            fs.writeFileSync(userJson, users);
            res.send('usuário cadastrado com sucesso!');
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
        for (user of users){
            if((user.email == email) && (bcrypt.compareSync(password, user.password))){
                // res.send('ok');
                console.log(req.sessionID);
                console.log(req.session);
                res.redirect('/perfil');
                  
            }            
        }
        res.status(401).send('não autorizado')    
   
    }
}

module.exports = UserController;