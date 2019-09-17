var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any)=>{
        cb(null, 'uploads/');
    },
    filename: (req:any, file:any, cb:any)=>{
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage: storage});


module.exports = upload;

// app.post('/', upload.single('image'), (req:any, res:any) => {
//         if (!req.file) {
//             return res.send({
//                 message: "Please Select an Image",
//                 responseCode: 200
//             });
//         }else {
//             return res.send({
//                 message: "uploaded an Image",
//                 responseCode: 200
//             });
//         }
// });