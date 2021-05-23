const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../middlewares/auth')
const storage = require('../middlewares/multer');

const upload = multer({storage: storage});
const db = require('../database/models');
const { Op } = require("sequelize");

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('profile', { title: "Meu Perfil", style: "profile", user: req.session.user });
});

router.post('/', upload.single('avatarFile'), function (req, res, next) {
  console.log(req.file);
  res.redirect('/perfil');
});

//Desafio 30

router.get('/pesquisar/:offset?/:limit?', async (req, res)=>{
  let limit = req.params.limit;
  let offset = req.params.offset;
  if(typeof(offset) == "undefined"){
    offset = 0;
  }
  if(typeof(limit) == "undefined"){
    limit = null;
  }else{limit = parseInt(limit)}
  
  let usersFounded = await db.User.findAll({
    limit: limit,
    offset: parseInt(offset)
  })
  return res.json (usersFounded)
})

router.get('/filtrar/:name', async (req, res)=>{
  let nameChecar = req.params;
  let usersFounded = await db.User.findAll({
    where: nameChecar
  })
  return res.json(usersFounded)
});




module.exports = router;
