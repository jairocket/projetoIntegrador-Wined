const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const registerValidator = require("../middlewares/registerValidators");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', userController.registerForm);
router.post('/', registerValidator, userController.saveForm);

module.exports = router;