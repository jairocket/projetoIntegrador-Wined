const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



// let userJson = path.join("users.json")
// let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

/* GET users listing. */
router.get('/', userController.registerForm);
router.post('/', [
    check("name").not().isEmpty().withMessage("Por favor, informe seu nome!"),
    check("surname").not().isEmpty().withMessage("Por favor, informe seu nome!"),
    check("email").isEmail().normalizeEmail().withMessage("Por favor, informe um e-mail válido!"),
    check("password").isLength({min: 8}).withMessage("Por favor, escolha uma senha com pelo menos oito caracteres!"),
    check("terms").exists().withMessage("Para se cadastrar, é preciso aceitar os termos de uso e a política de privacidade!"),
    body("email").custom(async(emailValidar)=>{
        try {
            const user = await db.User.findOne({
                where:{email: emailValidar}
            })

            if(user != null){
                return Promise.reject("E-mail já cadastrado.")
            }else{
                return emailValidar
            }
        }
        catch(err){
            console.log(err);
        }
    }).withMessage("Email, já cadastrado. Tente fazer login!")
],
userController.saveForm);

module.exports = router;


//(email)=>{
    //     let userExists = false;
    //     for(user of users){
    //         if(user.email == email){
    //             userExists = true;
    //             break
    //         }       
    //     }
    //     if (!userExists){
    //         return email;
    //     }
    // }