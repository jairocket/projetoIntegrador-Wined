const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const router = express.Router();

const auth = require('../middlewares/auth');
const passwordCheck = require('../middlewares/passwordCheck');
const jwt =require('../middlewares/jwt')
const DashboardService = require('../services/DashboardService')

//passwordCheck,jwt,

router.get('/', jwt,  DashboardController.getBrotherhoods);

router.get('/brotherhoods', jwt, passwordCheck, async (req, res)=>{
  let id = req.headers.authorization.id;
  const brotherhoods = await DashboardService.getMembers(req, res);
  res.json(brotherhoods)
})

router.get('/sair', function(req, res){
  req.session.destroy();
  res.redirect('/login');
});



router.get('/wines', auth, DashboardController.getWines);

router.get('/wine/:id', auth, DashboardController.getWineDetails);

router.post('/wines/favorite/', DashboardController.favorite);

router.post('/wines/wish/', DashboardController.wish); 

router.delete('/evento/sair/:id', auth, DashboardController.missEvent)

  module.exports = router;