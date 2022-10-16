const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const db = require("../database/models");
const Sequelize = require("sequelize");
const brotherhoodController = require("../controllers/BrotherhoodController");
const membershipCheck = require("../middlewares/membershipCheck");
const multer = require("multer");
const storage = require("../middlewares/multer");
const verifyJWT = require("../middlewares/verifyJWT");
const jwt = require("../middlewares/jwt");
const upload = multer({ storage: storage });

/*GET a form to create a brotherhood */
router.get("/criar", auth, (req, res) => {
  let avatar = req.session.user.avatar_picture;
  res.render("brotherhoodCreator", {
    user: req.session.user,
    avatar,
    title: "Cadastrar Confraria",
    style: "register",
  });
});

/*Creates a brotherhood */
router.post("/criar", brotherhoodController.brotherhoodCreator);

//GET brotherhoodEditor
router.get(
  "/editar/:id",
  auth,
  membershipCheck,
  brotherhoodController.updateView
);

//UPDATE member's access
router.put(
  "/editar/chancellor/:id/:m_id",
  brotherhoodController.chancellorSwitch
);

/* UPDATE brotherhoodPage */
router.put("/editar/:id", brotherhoodController.update);

//ADD new members into the brotherhood
router.post("/editar/adicionar/:id", brotherhoodController.addMembers);

//DELETE a brotherhood member
router.delete(
  "/editar/delete/:id/:m_id",
  auth,
  membershipCheck,
  brotherhoodController.deleteMember
); //criar controller. service criado.

//DELETE brotherhood
router.delete("/delete/:id", brotherhoodController.delete);

//GET brotherhood members
router.get("/confrades/:id", auth, brotherhoodController.getMembers);

router.get("/eventos/:id", auth, (req, res) => {
  let avatar = req.session.user.avatar_picture;
  const brotherhood = req.params.id;
  res.render("eventCreator", {
    user: req.session.user,
    avatar,
    brotherhood,
    title: "Cadastrar Eventos",
    style: "register",
  });
});

router.post("/eventos/:id", auth, brotherhoodController.eventCreator);

router.delete("/evento/deletar/:id", auth, brotherhoodController.deleteEvent);

router.get("/evento/editar/:id", brotherhoodController.editEvent);

router.put("/evento/editar/:id", brotherhoodController.updateEvent);

router.post("/post-content/", brotherhoodController.postContent);

router.post("/post-comment", brotherhoodController.postComment);

router.put("/edit-comment/:id", brotherhoodController.editComment);

router.post("/react", brotherhoodController.reactionsSwitch);

router.delete("/post-delete/", brotherhoodController.deletePosts);

router.delete("/comment-delete/", brotherhoodController.deleteComments);

router.get("/chancellorRequired", (req, res) => {
  let avatar = req.session.user.avatar_picture;
  res.render("chancellorRequired", {
    user: req.session.user,
    avatar,
    title: "Chanceler requerido",
    style: "chancellorsRequired",
  });
});

router.post(
  "/post/pictures/:id",
  upload.single("pictures"),
  brotherhoodController.postMidia
);

router.put(
  "/post/background/:id",
  upload.single("brotherhood_picture"),
  brotherhoodController.postBackground
);

/* GET brotherhoodPage. */
router.get(
  "/:id",
  jwt,
  membershipCheck,
  brotherhoodController.accessBrotherhood
);

//GET member's brotherhoods

//router.get('/confrarias/:id', brotherhoodController.getBrotherhoods)

module.exports = router;
