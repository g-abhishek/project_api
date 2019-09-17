"use strict";
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage });
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
//# sourceMappingURL=multer.config.js.map