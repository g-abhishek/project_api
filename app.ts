import express from 'express';
import UserRoute from './routes/user.route';
import PostRoute from './routes/post.route';

var bodyParser = require('body-parser');
var multer = require('multer');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var mangoos = require('./config/mongoose.config');

// const swagger = require('./routes/swagger')

var port = process.env.PORT || 3004;
var app = express();


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var userRouting = new UserRoute();
userRouting.userRoute(app);
 
var postRoute =  new PostRoute();
postRoute.postRoute(app);


let storage = multer.diskStorage({
    destination: (req:any , file:any, cb:any) => {
      cb(null, 'D:/')
    },
    filename: (req:any , file:any, cb:any) => {
      cb(null,Date.now()+ '-' + file.originalname )
    }
});
var upload = multer({storage: storage});

app.post('/', upload.single('image'), (req:any, res:any) => {
        if (!req.file) {
            return res.send({
                message: "Please Select an Image",
                responseCode: 200
            });
        }else {
            return res.send({
                message: "uploaded an Image",
                responseCode: 200
            });
        }
});


// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });
app.listen(3002, '192.168.1.106',()=>{
    console.log('Server is up and running on port numner ' + 3002);
});