const User = require('../models/user.model');
var jwt = require('jsonwebtoken');



export default class UserController{


    

    signUp = function(req:any, res:any, next:any){
        if(req.body.mobile && req.body.password){
            var signUpData = {
                mobile: req.body.mobile,
                password: req.body.password
            }
            User.create(signUpData, function(err:any, user:any){
                if(err){
                    return res.send({
                        message: 'db err',
                        responseCode: '700',
                        status: 200,
                        error: err
                    });
                }else{
                    var token = jwt.sign(JSON.stringify(user),'my_secret_key');
                    return res.send({
                        message: 'user created',
                        token: token,
                        responseCode: 700,
                        status: 200,
                        user: user
                    });
                }
            });
        }else{
            return res.send({
                message: 'all fields are required',
                responseCode: 300,
                status: 200
            });
        }
    }

    registration = function(req:any, res:any, next:any){
        var isRegistrationVarified = false;
        if(req.body.fullname && req.body.department && req.body.college && req.body.gender){
            var signUpData = {
                fullname: req.body.fullname,
                department: req.body.department,
                college: req.body.college,
                gender: req.body.gender
            }
        }else{
            return res.send({
                message: 'all fields are required',
                responseCode: 300,
                status: 200
            })
        }
    }

}

export const userController = new UserController();