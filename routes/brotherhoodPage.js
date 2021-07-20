const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../database/models');
const Sequelize = require('sequelize');
const brotherhoodController = require('../controllers/BrotherhoodController')
const membershipCheck = require('../middlewares/membershipCheck');
const multer = require('multer');
const storages = require('../middlewares/multer2');
const upload = multer({storage: storages})



/*GET a form to create a brotherhood */
router.get('/criar', auth, (req, res) =>{
    res.render('brotherhoodCreator', {user: req.session.user, title: 'Cadastrar Confraria', style: 'register' })
});

/*Creates a brotherhood */
router.post('/criar', brotherhoodController.brotherhoodCreator);

//GET brotherhoodEditor
router.get('/editar/:id', auth, membershipCheck, brotherhoodController.updateView);

//UPDATE member's access
router.put('/editar/chancellor/:id/:m_id', brotherhoodController.chancellorSwitch) 

/* UPDATE brotherhoodPage */
router.put('/editar/:id', brotherhoodController.update);

//ADD new members into the brotherhood
router.post('/editar/adicionar/:id', brotherhoodController.addMembers);

//DELETE a brotherhood member
router.delete('/editar/delete/:id/:m_id', auth, membershipCheck, brotherhoodController.deleteMember) //criar controller. service criado.

//DELETE brotherhood
router.delete('/delete/:id', brotherhoodController.delete);

//GET brotherhood members 
router.get('/confrades/:id', auth, brotherhoodController.getMembers);

router.get('/eventos/:id', auth, (req, res) =>{
    res.render('eventCreator', {user: req.session.user, title: 'Cadastrar Eventos', style: 'register'})
});

router.post('/post-content/', brotherhoodController.postContent);

router.post('/post-comment', brotherhoodController.postComment);

router.put('/edit-comment/:id', brotherhoodController.editComment);

router.post('/react', brotherhoodController.reactionsSwitch);

router.delete('/post-delete/', brotherhoodController.deletePosts);

router.delete('/comment-delete/', brotherhoodController.deleteComments);

router.get('/chancellorRequired', (req, res)=>{
    res.render('chancellorRequired', {
        user: req.session.user, 
        title: "Chanceler requerido", 
        style: "chancellorsRequired"})
});

router.post('/post/pictures', upload.single('pictures'), function(req, res, next){
    console.log(req.files)
    res.send('Archivos subidos correctamente')
})

/* GET brotherhoodPage. */
router.get('/:id', auth, membershipCheck, brotherhoodController.accessBrotherhood);









//GET member's brotherhoods

//router.get('/confrarias/:id', brotherhoodController.getBrotherhoods)

module.exports = router;
