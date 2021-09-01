const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  res.render('favoriteWines', { title: 'Vinhos', style: 'profile', user: req.session.user });
});

module.exports = router;