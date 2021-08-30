const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const router = express.Router();

const auth = require('../middlewares/auth');
const passwordCheck = require('../middlewares/passwordCheck');
const verifyJWT =require('../middlewares/verifyJWT')



router.get('/', verifyJWT, auth, passwordCheck, DashboardController.getBrotherhoods);

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