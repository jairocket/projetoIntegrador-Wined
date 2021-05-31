const express = require('express');
const router = express.Router();


// let brotherhoodJson = path.join("brotherhood.json")
// let users = JSON.parse(fs.readFileSync(brotherhoodJson, 'utf-8'));

// /* GET users listing. */
// router.get('/', BrotherhoodController.registerForm);
// router.post('/', [
//     check("nameBrotherhood").not().isEmpty().withMessage("Por favor, informe seu nome da Confraria!"),
//     check("nameCreate").not().isEmpty().withMessage("Por favor, informe seu nome!"),
//     check("surnameCreate").not().isEmpty().withMessage("Por favor, informe seu sobrenome!"),
//     check("date").not().isEmpty().withMessage("Por favor, informe a data de criação!"),
//     body("nameBrotherhood").custom((nameBrotherhood)=>{
//         let brotherhoodExists = false;
//         for(brotherhood of brotherhoods){
//             if(brotherhood.nameBrotherhood == nameBrotherhood){
//                 brotherhoodExists = true;
//                 break
//             }       
//         }
//         if (!brotherhoodExists){
//             return brotherhood;
//         }
//     }).withMessage("Já existe uma Confraria com este nome! Substitua por outro!")
// ],
// BrotherhoodController.saveForm);


router.get('/', function(req, res, next) {
    res.render('registerBrotherhood.ejs', { title: "Cadastrar Confraria", style: "global"});
    
  });
//   , user: req.session.user 

module.exports = router;

