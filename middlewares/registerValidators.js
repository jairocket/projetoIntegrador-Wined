const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

const registerValidations = [
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
                return Promise.reject("E-mail já cadastrado.");
            }else{
                return emailValidar;
            }
        }
        catch(err){
            console.log(err);
        }
    })
]

module.exports = registerValidations;