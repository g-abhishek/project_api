"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controllers/user.controller");
var Express = require('express');
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.prototype.hello = function (app) {
        app.get('/', function (req, res) {
            return res.send('hello abhishek');
        });
        app.get('/anil', function (req, res) {
            return res.send('hello Anil');
        });
    };
    Route.prototype.signUp = function (app) {
        app.post('/signup', user_controller_1.userController.signUp);
    };
    Route.prototype.Route = function (app) {
        this.signUp(app);
    };
    return Route;
}());
exports.default = Route;
//# sourceMappingURL=user.route.js.map