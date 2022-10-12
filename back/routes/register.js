const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();
const registerValidator = require("../middlewares/registerValidators");
const Sequelize = require("sequelize");
const auth = require("../middlewares/auth");
const Op = Sequelize.Op;

router.get("/", userController.registerForm);
router.post("/", registerValidator, userController.saveForm);
router.get("/password", auth, userController.passwordEditor);
router.put("/password", auth, userController.passwordUpdator);

module.exports = router;
