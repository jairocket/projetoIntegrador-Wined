const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const auth = require('../middlewares/auth')
const multer = require('multer');

const storage = require('../middlewares/multer');
const upload = multer({storage: storage});

router.get('/:id', auth, userController.profileEditorForm);
router.put('/:id', upload.any(), userController.profileEditor);
router.delete('/:id', userController.delete)

module.exports = router