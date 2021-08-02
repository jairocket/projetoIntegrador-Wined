const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const loginValidator = require("../middlewares/loginValidators");

/* GET users listing. */
router.get('/', userController.loginForm);
router.post('/', loginValidator, userController.userLogger);
router.get('/password', userController.passwordForm);
router.put('/password', userController.passwordGenerator);



module.exports = router;
