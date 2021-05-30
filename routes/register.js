const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const loginValidator = require("../middlewares/loginValidators");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', userController.registerForm);
router.post('/', loginValidator, userController.saveForm);

module.exports = router;