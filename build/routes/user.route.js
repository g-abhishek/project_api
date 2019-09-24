"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controllers/user.controller");
var upload = require('../config/multer.config');
var UserRoute = /** @class */ (function () {
    function UserRoute() {
    }
    UserRoute.prototype.signUp = function (app) {
        app.post('/signup', user_controller_1.userController.signUp);
    };
    UserRoute.prototype.registerUser = function (app) {
        app.post('/registeruser', user_controller_1.userController.registerUser);
    };
    UserRoute.prototype.getSignedUser = function (app) {
        app.post('/getsigneduser', user_controller_1.userController.getSignedUser);
    };
    UserRoute.prototype.user = function (app) {
        app.get('/user', user_controller_1.userController.user);
    };
    UserRoute.prototype.editUser = function (app) {
        app.post('/edituser', user_controller_1.userController.editUser);
    };
    UserRoute.prototype.profilePic = function (app) {
        app.post('/profilePic', user_controller_1.userController.profilePic);
    };
    UserRoute.prototype.userRoute = function (app) {
        this.signUp(app);
        this.registerUser(app);
        this.getSignedUser(app);
        this.user(app);
        this.editUser(app);
        this.profilePic(app);
    };
    return UserRoute;
}());
exports.default = UserRoute;
//# sourceMappingURL=user.route.js.map