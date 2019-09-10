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
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var mangooseConnection = require('./config/mongoose.config');
// let dev_db_url = 'mongodb+srv://Abhishek:Abhishek@abhishek-cluster-jxsrb.mongodb.net/final_year_project_db?retryWrites=true&w=majority';
// mongoose.connect(dev_db_url,{ useNewUrlParser: true },(err:any,res:any)=>{
//     if(err){
//         console.log("dbb err");
//     }else{
//         console.log("Connected To Database");
//     }
// })
// const swagger = require('./routes/swagger')
var port = process.env.PORT || 3004;
var app = express_1.default();
app.use(express_1.default.static('public'));
// extended=false is a configuration option that tells the parser to use the classic encoding.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var userRouting = new user_route_1.default();
userRouting.userRoute(app);
var postRoute = new post_route_1.default();
postRoute.postRoute(app);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage });
app.post('/', upload.single('image'), function (req, res) {
    if (!req.file) {
        return res.send({
            message: "Please Select an Image",
            responseCode: 200
        });
    }
    else {
        return res.send({
            message: "uploaded an Image",
            responseCode: 200
        });
    }
});
app.listen(port, function () {
    console.log('Server is up and running on port numner ' + port);
});
// app.listen(3002, '192.168.1.106',()=>{
//     console.log('Server is up and running on port numner ' + 3002);
// });
//# sourceMappingURL=app.js.map