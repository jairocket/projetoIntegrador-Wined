const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

const loginValidations = [
    check("email").isEmail().normalizeEmail().withMessage("Por favor, informe um e-mail válido!"),
    check("password").not().isEmpty().withMessage("Por favor, digite sua senha!"),
    body("email").custom(async(emailValidar)=>{
        try {
            if(emailValidar === '@') {
                return emailValidar;
            }
            const user = await db.User.findOne({
                where:{email: emailValidar}
            })
            if(!user){
                console.log(emailValidar)
                return Promise.reject("E-mail não cadastrado!");
            }else{
                return emailValidar;
            }
        }
        catch(err){
            console.log(err);
        }
    })
]

module.exports = loginValidations;