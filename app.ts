import express from 'express';
import UserRoute from './routes/user.route';

var bodyParser = require('body-parser');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var mangoos = require('./config/mongoose.config');

// const swagger = require('./routes/swagger')

var port = process.env.PORT || 3002;
var app = express();


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var userRouting = new UserRoute();
userRouting.userRoute(app);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});