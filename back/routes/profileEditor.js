const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const path = require("path");
const fs = require("fs");
const auth = require("../middlewares/auth");
const multer = require("multer");

const storage = require("../middlewares/multer");
const upload = multer({ storage: storage });

router.get("/:id", auth, userController.profileEditorForm);
router.put("/:id", userController.profileEditor);
router.delete("/:id", userController.delete);

router.put(
  "/upload/profile-picture/:id",
  upload.single("profile-picture"),
  userController.uploadProfilePicture
);
router.put(
  "/upload/background-picture/:id",
  upload.single("background-picture"),
  userController.uploadBackgroundPicture
);

module.exports = router;
