"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var post_route_1 = __importDefault(require("./routes/post.route"));
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var mangoos = require('./config/mongoose.config');
var os = require('os');
// const swagger = require('./routes/swagger')
var port = process.env.PORT || 3004;
var app = express_1.default();
app.use(express_1.default.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
var userRouting = new user_route_1.default();
userRouting.userRoute(app);
var postRoute = new post_route_1.default();
postRoute.postRoute(app);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage });
app.post('/', upload.single('file'), function (req, res) {
    var file = req.file;
    if (!file) {
        var error = new Error('Please upload a file');
        return res.send(error);
    }
    res.send(file);
});
// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });
console.log(os.hostname());
app.listen(3002, '192.168.1.107', function () {
    console.log('Server is up and running on port numner ' + 3002);
});
//# sourceMappingURL=app.js.map