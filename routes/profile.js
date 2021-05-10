const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../middlewares/auth')
const storage = require('../middlewares/multer');

const upload = multer({storage: storage});

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('profile', { title: "Meu Perfil", style: "profile", user: req.session.user });
});

router.post('/', upload.single('avatarFile'), function (req, res, next) {
  console.log(req.file);
  res.redirect('/perfil');
})

module.exports = router;
