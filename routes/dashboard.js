const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const router = express.Router();

const auth = require('../middlewares/auth');


router.get('/', auth, DashboardController.getBrotherhoods);

router.get('/sair', function(req, res){
  req.session.destroy();
  res.redirect('/login');
});

router.get('/wines', DashboardController.getWines);

  module.exports = router;