const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')

router.get('/', auth, function(req, res){
    res.render('dashboard', { title: "Dashboard", style: "brotherhood", user: req.session.user });
  });

  module.exports = router;