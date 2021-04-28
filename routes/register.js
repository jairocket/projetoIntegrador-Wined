const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

/* GET users listing. */
router.get('/', userController.registerForm);
router.post('/', userController.saveForm);

module.exports = router;
