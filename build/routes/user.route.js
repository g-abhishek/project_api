"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controllers/user.controller");
var Express = require('express');
var UserRoute = /** @class */ (function () {
    function UserRoute() {
    }
    UserRoute.prototype.signUp = function (app) {
        app.post('/signup', user_controller_1.userController.signUp);
    };
    UserRoute.prototype.userRoute = function (app) {
        this.signUp(app);
    };
    return UserRoute;
}());
exports.default = UserRoute;
//# sourceMappingURL=user.route.js.map