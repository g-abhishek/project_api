"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('../models/user.model');
var UserController = /** @class */ (function () {
    function UserController() {
        this.signUp = function (req, res, next) {
            if (req.body.mobile && req.body.password) {
                var signUpData = {
                    mobile: req.body.mobile,
                    password: req.body.password
                };
                User.create(signUpData, function (err, user) {
                    if (err) {
                        return res.send({
                            message: 'db err',
                            responseCode: '700',
                            status: 200,
                            error: err
                        });
                    }
                    else {
                        return res.send({
                            message: 'user created',
                            responseCode: 700,
                            status: 200,
                            user: user
                        });
                    }
                });
            }
            else {
                return res.send({
                    message: 'all fields are required',
                    responseCode: 300,
                    status: 200
                });
            }
        };
    }
    return UserController;
}());
exports.default = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map