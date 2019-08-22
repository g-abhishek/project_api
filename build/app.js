"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var user_route_1 = __importDefault(require("./routes/user.route"));
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var userRoute = new user_route_1.default();
userRoute.Route(app);
var port = process.env.PORT || 3002;
// app.get('/home/', function(req:any, res:any){
//     return res.send("home page");
// })
var route = new user_route_1.default();
route.hello(app);
app.listen(port, function () {
    console.log('server is running on port ' + port);
});
// app.listen(3002)
//# sourceMappingURL=app.js.map