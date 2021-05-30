const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('favoriteWines', { title: 'Vinhos', style: 'profile', user: req.session.user });
});

module.exports = router;