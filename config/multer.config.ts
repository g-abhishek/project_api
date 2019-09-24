var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any)=>{
        cb(null, 'uploads/');
    },
    filename: (req:any, file:any, cb:any)=>{
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage: storage}).single('file');


module.exports = upload;
