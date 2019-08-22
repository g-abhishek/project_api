const User = require('../models/user.model');

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
                    return res.send({
                        message: 'user created',
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

}

export const userController = new UserController();