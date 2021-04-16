const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('favoriteWines', { title: "Vinhos Favoritos", style: "profile" });
});

module.exports = router;