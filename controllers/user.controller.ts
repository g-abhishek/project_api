const User = require('../models/user.model');
var jwt = require('jsonwebtoken');



export default class UserController {

    signUp = function (req: any, res: any, next: any) {
        if (req.body.mobile && req.body.password) {
            var signUpData = {
                mobile: req.body.mobile,
                password: req.body.password
            }
            User.create(signUpData, function (err: any, user: any) {
                if (err) {
                    return res.send({
                        message: 'db err',
                        responseCode: '700',
                        status: 200,
                        error: err
                    });
                } else {
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
        } else {
            return res.send({
                message: 'all fields are required',
                responseCode: 300,
                status: 200
            });
        }
    }
    getSignedUser = function (req: any, res: any, next: any) {
        if (req.body.mobile && req.body.password) {
            var signUpData = {
                mobile: req.body.mobile,
                password: req.body.password
            }
            User.findOne(signUpData, function (err: any, user: any) {
                if (err) {
                    return res.send({
                        message: 'db err',
                        responseCode: '700',
                        status: 200,
                        error: err
                    });
                } else {
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
        } else {
            return res.send({
                message: 'all fields are required',
                responseCode: 300,
                status: 200
            });
        }
    }

    registerUser = function (req: any, res: any, next: any) {
        var isRegistrationVarified = false;
        var token = req.headers.token;
        if (token) {
            jwt.verify(token, 'my_secret_key', (err: any, decoded: any) => {
                if (err) {
                    return res.send({
                        message: 'not valid token',
                        responseCode: 700,
                        status: 200,
                        error: err
                    })
                } else {
                    req.user = decoded;
                    if (req.body.fullname && req.body.department && req.body.college && req.body.gender) {
                        var registrationData = {
                            fullname: req.body.fullname,
                            department: req.body.department,
                            college: req.body.college,
                            gender: req.body.gender,
                            isRegistrationVarified: true
                        }
                        User.updateOne({ '_id': req.user._id }, registrationData, (err: any, result: any) => {
                            if (err) {
                                return res.send({
                                    message: 'unauthorized db err',
                                    responseCode: 700,
                                    status: 200,
                                    error: err
                                })
                            }
                            else {
                                User.findById({ '_id': req.user._id }, (err:any, user:any) => {
                                    if(err){
                                        return res.send({
                                            message: 'no user found',
                                            responseCode: 700,
                                            status: 200,
                                            error: err
                                        })
                                    }else{
                                        return res.send({
                                            message: 'decodes token',
                                            status: 200,
                                            result: user
                                        })
                                    }
                                })
                                
                            }
                        })

                    } else {
                        return res.send({
                            message: 'all fields are required',
                            responseCode: 300,
                            status: 200
                        })
                    }


                }
            })
        }

    }

}

export const userController = new UserController();