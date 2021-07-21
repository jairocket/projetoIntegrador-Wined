const multer = require('multer');
const path = require('path');

const storages = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storages})

module.exports = storages

//./uploads/img