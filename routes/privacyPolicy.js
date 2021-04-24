const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('privacyPolicy', { title: "Privacidade", style: "profile" });
});

module.exports = router;