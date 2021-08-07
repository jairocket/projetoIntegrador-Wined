const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('privacyPolicy', { title: "Privacidade", style: "rules", user: req.session.user });
});

module.exports = router;