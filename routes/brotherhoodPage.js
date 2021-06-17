const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../database/models');
const Sequelize = require('sequelize');
const brotherhoodController = require('../controllers/BrotherhoodController')
const membershipCheck = require('../middlewares/membershipCheck');



/*GET a form to create a brotherhood */
router.get('/criar', auth, (req, res) =>{
    res.render('brotherhoodCreator', {user: req.session.user, title: 'Cadastrar Confraria', style: 'register' })
});

/*Creates a brotherhood */
router.post('/criar', brotherhoodController.brotherhoodCreator);

//GET brotherhoodEditor
router.get('/editar/:id', auth, membershipCheck, (req, res)=>{
    res.render('brotherhoodEditor', {
        id: req.params.id,
        user: req.session.user, 
        title: 'Editar Confraria', 
        style: 'register'})
}) //criar view, incluir callback para renderizar a view

/* UPDATE brotherhoodPage */
router.put('/editar/:id', brotherhoodController.update);

//DELETE brotherhood
router.delete('/delete/:id', brotherhoodController.delete);

//GET brotherhood members 
router.get('/confrades/:id', auth, brotherhoodController.getMembers);

router.get('/eventos/:id', auth, (req, res) =>{
    res.render('eventCreator', {user: req.session.user, title: 'Cadastrar Eventos', style: 'register'})
}); 

/* GET brotherhoodPage. */
router.get('/:id', auth, membershipCheck, brotherhoodController.accessBrotherhood);









//GET member's brotherhoods

//router.get('/confrarias/:id', brotherhoodController.getBrotherhoods)

module.exports = router;
