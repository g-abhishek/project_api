"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
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
                        var token = jwt.sign(JSON.stringify(user), 'my_secret_key');
                        return res.send({
                            message: 'user created',
                            token: token,
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
        this.getSignedUser = function (req, res, next) {
            if (req.body.mobile && req.body.password) {
                var signUpData = {
                    mobile: req.body.mobile,
                    password: req.body.password
                };
                User.findOne(signUpData, function (err, user) {
                    if (err) {
                        return res.send({
                            message: 'db err',
                            responseCode: '700',
                            status: 200,
                            error: err
                        });
                    }
                    else {
                        var token = jwt.sign(JSON.stringify(user), 'my_secret_key');
                        return res.send({
                            message: 'user data',
                            token: token,
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
        this.registerUser = function (req, res, next) {
            var isRegistrationVarified = false;
            var token = req.headers.token;
            if (token) {
                jwt.verify(token, 'my_secret_key', function (err, decoded) {
                    if (err) {
                        return res.send({
                            message: 'not valid token',
                            responseCode: 700,
                            status: 200,
                            error: err
                        });
                    }
                    else {
                        req.user = decoded;
                        if (req.body.fullname && req.body.department && req.body.college && req.body.gender) {
                            var registrationData = {
                                fullname: req.body.fullname,
                                department: req.body.department,
                                college: req.body.college,
                                gender: req.body.gender,
                                isRegistrationVarified: true
                            };
                            User.updateOne({ '_id': req.user._id }, registrationData, function (err, result) {
                                if (err) {
                                    return res.send({
                                        message: 'unauthorized db err',
                                        responseCode: 700,
                                        status: 200,
                                        error: err
                                    });
                                }
                                else {
                                    User.findById({ '_id': req.user._id }, function (err, user) {
                                        if (err) {
                                            return res.send({
                                                message: 'no user found',
                                                responseCode: 700,
                                                status: 200,
                                                error: err
                                            });
                                        }
                                        else {
                                            return res.send({
                                                message: 'decodes token',
                                                status: 200,
                                                result: user
                                            });
                                        }
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
                    }
                });
            }
        };
    }
    return UserController;
}());
exports.default = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map