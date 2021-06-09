const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../database/models');
const Sequelize = require('sequelize');
const brotherhoodController = require('../controllers/BrotherhoodController')
const membershipCheck = require('../middlewares/membershipCheck');



/*GET a form to create a brotherhood */

router.get('/criar', (req, res) =>{
    res.render('brotherhoodCreator', {user: req.session.user, title: 'Cadastrar Confraria', style: 'register' })
});

/*Creates a brotherhood */
router.post('/criar', brotherhoodController.brotherhoodCreator);

//GET brotherhood members 
router.get('/confrades/:id', brotherhoodController.getMembers);

router.get('/eventos/:id', (req, res) =>{
    res.render('eventCreator', {user: req.session.user, title: 'Cadastrar Eventos', style: 'register'})
}); 

/* GET home page. */
router.get('/:id', auth, membershipCheck, brotherhoodController.accessBrotherhood);







//GET member's brotherhoods

//router.get('/confrarias/:id', brotherhoodController.getBrotherhoods)

module.exports = router;
