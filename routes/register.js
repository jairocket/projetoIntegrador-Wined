const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const validator = require("../middlewares/validators")
const path = require('path');
const fs = require('fs');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', userController.registerForm);
router.post('/', validator, userController.saveForm);

module.exports = router;