"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var base64ToImage = require('base64-to-image');
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
                            responseCode: 200,
                            status: 200,
                            user: user
                        });
                    }
                });
            }
            else {
                return res.send({
                    message: 'all fields are required',
                    responseCode: 100,
                    status: 200
                });
            }
        };
        //login
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
                        if (!user) {
                            return res.send({
                                message: 'no user found',
                                responseCode: 500,
                                status: 200
                            });
                        }
                        else if (user.isRegistrationVarified === false) {
                            var token = jwt.sign(JSON.stringify(user), 'my_secret_key');
                            return res.send({
                                message: 'not regitered user',
                                token: token,
                                responseCode: 300,
                                status: 200,
                                result: false
                            });
                        }
                        else {
                            var token = jwt.sign(JSON.stringify(user), 'my_secret_key');
                            return res.send({
                                message: 'registered user',
                                token: token,
                                responseCode: 200,
                                status: 200,
                                result: user
                            });
                        }
                    }
                });
            }
            else {
                return res.send({
                    message: 'all fields are required',
                    responseCode: 100,
                    status: 200
                });
            }
        };
        this.user = function (req, res, next) {
            var token = req.headers.token;
            if (token) {
                jwt.verify(token, 'my_secret_key', function (err, user) {
                    if (err) {
                        return res.send({
                            message: 'not valid token',
                            responseCode: 900,
                            status: 200,
                            error: err
                        });
                    }
                    else {
                        if (user.isRegistrationVarified == false) {
                            return res.send({
                                message: "Not Verified",
                                responseCode: 300,
                                status: 200
                            });
                        }
                        else {
                            return res.send({
                                message: "Verified User",
                                responseCode: 200,
                                status: 200,
                                user: user
                            });
                        }
                    }
                });
            }
            else {
                return res.send({
                    message: "token is required",
                    responseCode: 100
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
                                                message: 'error',
                                                responseCode: 700,
                                                status: 200,
                                                error: err
                                            });
                                        }
                                        else {
                                            var token = jwt.sign(JSON.stringify(user), 'my_secret_key');
                                            return res.send({
                                                message: 'Registration Successfull',
                                                token: token,
                                                responseCode: 200,
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
            else {
                return res.send({
                    message: 'token required',
                    responseCode: 900,
                    status: 200
                });
            }
        };
        this.editUser = function (req, res) {
            var token = req.headers.token;
            if (token) {
                jwt.verify(token, 'my_secret_key', function (err, user) {
                    if (err) {
                        return res.send({
                            message: 'not valid token',
                            responseCode: 900,
                            status: 200,
                            error: err
                        });
                    }
                    else {
                        if (req.body.fullname && req.body.department && req.body.college && req.body.gender) {
                            var userData = {
                                fullname: req.body.fullname,
                                department: req.body.department,
                                college: req.body.college,
                                gender: req.body.gender
                            };
                            User.updateOne({ _id: user._id }, userData, function (err, result) {
                                if (err) {
                                    return res.send({
                                        message: 'db err',
                                        responseCode: 700,
                                        status: 200,
                                        error: err
                                    });
                                }
                                else {
                                    User.findById({ _id: user._id }, function (err, user) {
                                        var token = jwt.sign(JSON.stringify(user), 'my_secret_key');
                                        if (err) {
                                            return res.send({
                                                message: 'db err',
                                                responseCode: 700,
                                                status: 200,
                                                error: err
                                            });
                                        }
                                        else {
                                            return res.send({
                                                message: 'user updated',
                                                responseCode: 200,
                                                status: 200,
                                                token: token,
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
                                responseCode: 100,
                                status: 200
                            });
                        }
                    }
                });
            }
            else {
                return res.send({
                    message: 'token required',
                    responseCode: 900,
                    status: 200
                });
            }
        };
        this.profilePic = function (req, res) {
            var token = req.headers.token;
            var Var1 = req.body.file;
            var data = 'data:image/jpeg;base64,';
            data += Var1;
            if (token) {
                jwt.verify(token, 'my_secret_key', function (err, user) {
                    if (err) {
                        return res.send({
                            message: 'unauthorized access',
                            responseCode: 700,
                            error: err
                        });
                    }
                    else {
                        // base64str to image
                        var optionalObj = { 'fileName': new Date().getTime() + '-postImage', 'type': 'jpg' };
                        var imageInfo = base64ToImage(data, 'public/profilePic/', optionalObj);
                        var pathname = "http://192.168.1.107:3002" + "/profilePic/" + imageInfo.fileName;
                        console.log(imageInfo);
                        console.log(pathname);
                        //--------base64str to image end --------
                        var userId = user._id;
                        User.findOneAndUpdate({ '_id': userId }, { $set: { 'profilePic': pathname } }, { new: true, useFindAndModify: false }, function (err, result) {
                            var token = jwt.sign(JSON.stringify(result), 'my_secret_key');
                            if (err) {
                                return res.send({
                                    message: 'error',
                                    responseCode: 500,
                                    error: err
                                });
                            }
                            else {
                                if (!result) {
                                    return res.send({
                                        message: 'no user found',
                                        responseCode: 700,
                                        result: result
                                    });
                                }
                                else {
                                    return res.send({
                                        message: 'profile pic updated',
                                        responseCode: 200,
                                        token: token,
                                        result: result
                                    });
                                }
                            }
                        });
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