const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let userJson = path.join("users.json")

let UserController = {
    registerForm: (req, res)=>{
        res.render('register')
    },
    saveForm: (req, res)=>{
        let errorsList = validationResult(req);
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }
        if (errorsList.isEmpty()){
            let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));
            let {email, name, surname, password, terms} = req.body;
            let hashedPassword = bcrypt.hashSync(password, 12);
            let user = {email, name, surname, terms, password: hashedPassword, id: uuidv4()};
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
                req.session.user = user
                res.redirect('/perfil')
                //res.send('ok');
            }
            req.session.user = user
        }
        res.status(401).send('não autorizado')    
   
    }
}

module.exports = UserController;