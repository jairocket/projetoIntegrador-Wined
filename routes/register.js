const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');

/* GET users listing. */
router.get('/', userController.registerForm);
router.post('/', [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({min: 8}),
    check("terms").exists()
],    
userController.saveForm);

module.exports = router;
