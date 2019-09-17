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
    UserRoute.prototype.uplaod = function (app) {
        app.post('/upload', upload.single('file'), function (req, res) {
            var file = req.file;
            if (!file) {
                var error = new Error('Please upload a file');
                return res.send(error);
            }
            res.send(file);
        });
    };
    UserRoute.prototype.userRoute = function (app) {
        this.signUp(app);
        this.registerUser(app);
        this.getSignedUser(app);
        this.user(app);
        this.editUser(app);
        this.uplaod(app);
    };
    return UserRoute;
}());
exports.default = UserRoute;
//# sourceMappingURL=user.route.js.map