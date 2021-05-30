const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../database/models');
const Sequelize = require('sequelize');

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
        res.json(brotherhood)
});

module.exports = router;
