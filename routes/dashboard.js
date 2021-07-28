const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const router = express.Router();

const auth = require('../middlewares/auth');
const DashboardService = require('../services/DashboardService');


router.get('/', auth, DashboardController.getBrotherhoods);

router.get('/sair', function(req, res){
  req.session.destroy();
  res.redirect('/login');
});

// router.post('/wines', DashboardController.getWines);

router.get('/wines', auth, DashboardController.getWines);

router.post('/wines/favorite/', DashboardController.favorite);

router.post('/wines/wish/', DashboardController.wish); 

  module.exports = router;