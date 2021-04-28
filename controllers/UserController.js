const bcrypt = require('bcryptjs');
const { json } = require('express');
const fs = require('fs');
const path = require('path');

let userJson = path.join("users.json")

let UserController = {
    registerForm: (req, res)=>{
        res.render('register')
    },
    saveForm: (req, res)=>{
        let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));
        let {email, name, surname, password} = req.body;
        let hashedPassword = bcrypt.hashSync(password, 12);
        let user = {email, name, surname, password: hashedPassword};
        users.push(user);
        users = JSON.stringify(users);
        fs.writeFileSync(userJson, users);
        res.send('usuário cadastrado com sucesso!');
        
    },
    loginForm: (req, res)=>{
        res.render('login')
    },
    logUser: (req,res)=>{

    }
}

module.exports = UserController;