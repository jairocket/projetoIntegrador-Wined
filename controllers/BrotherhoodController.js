// const bcrypt = require('bcryptjs');
// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const { check, validationResult, body } = require('express-validator');

// let brotherhoodJson = path.join("brotherhood.json")

// let BrotherhoodController = {
//     registerForm: (req, res)=>{
//         res.render('registerBrotherhood');
//     },
//     saveForm: (req, res)=>{
//         let errorsList = validationResult(req);
//         if (errorsList.isEmpty()){
//             let id = uuidv4();
//             let brotherhoods = JSON.parse(fs.readFileSync(brotherhoodJson, 'utf-8'));
//             let {email, name, date, terms} = req.body;
//             let brotherhood = {id,email, name, date, terms};
//             brotherhoods.push(brotherhood);
//             brotherhoods = JSON.stringify(brotherhoods, null, 2);
//             fs.writeFileSync(brotherhoodJson, brotherhoods);
//             res.send('usuário cadastrado com sucesso!');
//         }else{
//             console.log(errorsList)
//             res.render('registerBrotherhood', {errors: errorsList.errors});
//         }  
//     },
//     loginForm: (req, res)=>{
//         res.render('login')
//     },
//     userLogger: (req,res)=>{
//         let brotherhoods = JSON.parse(fs.readFileSync(brotherhoodJson, 'utf-8'));
//         let {email, password} = req.body;
//         for (brotherhood of brotherhoods){
//             if((brotherhood.email == email) && (bcrypt.compareSync(password, brotherhood.password))){
//                 // res.send('ok');
//                 console.log(req.sessionID);
//                 console.log(req.session);
//                 res.redirect('/perfil');
                  
//             }            
//         }
//         res.status(401).send('não autorizado')    
   
//     }
// }

// module.exports = BrotherhoodController;