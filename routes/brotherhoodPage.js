const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../database/models');
const Sequelize = require('sequelize');
const brotherhoodController = require('../controllers/BrotherhoodController')


/* GET home page. */
router.get('/:id', auth, async function(req, res) {
  const{id} = req.params;
  const brotherhood = await db.Brotherhood.findByPk(id);
  console.log(brotherhood)
  res.render('brotherhoodPage', { 
    title: "Confraria",
    style: "brotherhood", 
    user: req.session.user,
    brotherhood:brotherhood
   });
});

/*Creates a brotherhood */
router.post('/criar', brotherhoodController.brotherhoodCreator);

//GET brotherhood members

router.get('/confrades/:id', brotherhoodController.getMembers);

//GET member's brotherhoods

//router.get('/confrarias/:id', brotherhoodController.getBrotherhoods)

module.exports = router;
