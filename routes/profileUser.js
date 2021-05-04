const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');



/* GET home page. */
router.get('/:id', function(req, res, next) {
  let {id} = req.params;
  console.log(req.session);
  res.render('profileUser', { title: "Meu Perfil", style: "profile" });
});


router.get("/dark-mode", function(req, res){
  req.session.darkMode = true;
  // !req.session.darkMode
  console.log(req.session);
  res.redirect('/perfil');
})

module.exports = router;
