const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const auth = require('../middlewares/auth')

let userJson = path.join("users.json")
let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

router.get('/:id',auth, userController.profileEditorForm);
router.put('/:id',auth, userController.profileEditor);
router.delete('/:id',auth, userController.delete)

module.exports = router