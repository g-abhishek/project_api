"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var bodyParser = require('body-parser');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var mangoos = require('./config/mongoose.config');
// const swagger = require('./routes/swagger')
var port = process.env.PORT || 3002;
var app = express_1.default();
app.use(express_1.default.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var userRouting = new user_route_1.default();
userRouting.userRoute(app);
app.listen(port, function () {
    console.log('Server is up and running on port numner ' + port);
});
//# sourceMappingURL=app.js.map