const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('profile', { title: "Meu Perfil", style: "profile" });
=======
router.get('/', auth, function(req, res, next) {
  res.render('profile', { title: "Meu Perfil", style: "profile", user: req.session.user });
>>>>>>> 74870e150d8940c3aaf83f35df3dd686cc42e25d
});



module.exports = router;
