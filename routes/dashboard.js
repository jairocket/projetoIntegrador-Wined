const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const router = express.Router();

const auth = require('../middlewares/auth');


router.get('/', auth, DashboardController.getBrotherhoods);

  module.exports = router;