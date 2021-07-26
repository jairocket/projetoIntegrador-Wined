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

router.post('/wines', DashboardController.getWines);

router.post('/wines/favorite/:id', DashboardController.favorite);

router.post('/wines/wish/:id', DashboardController.wish); 

  module.exports = router;