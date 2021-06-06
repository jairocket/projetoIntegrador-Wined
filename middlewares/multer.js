const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === "avatarFile") {
      cb(null, './uploads/images/profilePictures');
    } else if(file.fieldname === "backgroundFile") {
      cb(null, './uploads/images/backgroundPictures');
    } else {
      cb(null, './uploads/images/brotherhoodPictures');
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${file.originalname}`);
  }
});

module.exports = storage;