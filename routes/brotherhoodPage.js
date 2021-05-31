const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Brotherhood_User = require('../database/models/Brotherhood_User');

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('brotherhoodPage', { title: "Confraria", style: "brotherhood", user: req.session.user });
});

router.post('/criar', async function (req, res){
  let {
    name,  
    description, 
    background_Pic,
    chancellor  
  } = req.body;
      
  const brotherhood = await db.Brotherhood.create({
    name,  
    description, 
    background_Pic, 
    chancellor
  })
    console.log(brotherhood)
    return res.json(brotherhood)
});

router.get('/confrades/:id', async function(req, res){
    let id = req.params.id;
    
    const brotherhoodMembers = await db.Brotherhood.findAll({
      include: [
        {model: db.User}
      ],
      where:{id} 
    })
    return res.json(brotherhoodMembers)
})

module.exports = router;
