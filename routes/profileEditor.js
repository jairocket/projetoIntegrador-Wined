const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');

let userJson = path.join("users.json")
let users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

router.get('/', userController.profileEditorForm)

module.exports = router