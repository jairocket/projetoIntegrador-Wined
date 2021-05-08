const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('profile', { title: "Meu Perfil", style: "profile", user: req.session.user });
});

module.exports = router;
