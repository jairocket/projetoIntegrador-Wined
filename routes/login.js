const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const loginValidator = require("../middlewares/loginValidators");

/* GET users listing. */
router.get('/', userController.loginForm);
router.post('/', loginValidator, userController.userLogger);

module.exports = router;
