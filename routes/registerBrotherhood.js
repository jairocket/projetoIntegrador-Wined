const express = require('express');
const BrotherhoodController = require('../controllers/BrotherhoodController');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');

let brotherhoodJson = path.join("brotherhood.json")
let users = JSON.parse(fs.readFileSync(brotherhoodJson, 'utf-8'));

/* GET users listing. */
router.get('/', BrotherhoodController.registerForm);
router.post('/', [
    check("nameBrotherhood").not().isEmpty().withMessage("Por favor, informe seu nome da Confraria!"),
    check("nameCreate").not().isEmpty().withMessage("Por favor, informe seu nome!"),
    check("surnameCreate").not().isEmpty().withMessage("Por favor, informe seu sobrenome!"),
    check("date").not().isEmpty().withMessage("Por favor, informe a data de criação!"),
    body("nameBrotherhood").custom((nameBrotherhood)=>{
        let brotherhoodExists = false;
        for(brotherhood of brotherhoods){
            if(brotherhood.nameBrotherhood == nameBrotherhood){
                brotherhoodExists = true;
                break
            }       
        }
        if (!brotherhoodExists){
            return brotherhood;
        }
    }).withMessage("Já existe uma Confraria com este nome! Substitua por outro!")
],
BrotherhoodController.saveForm);

module.exports = router;
