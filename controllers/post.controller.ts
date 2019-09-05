var mongoose = require('mongoose');
var Post = require('../models/post.model');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');

class PostController {

    createPost = function (req: any, res: any) {
        var token = req.headers.token;
        if (token) {
            jwt.verify(token, 'my_secret_key', (err: any, user: any) => {
                if (err) {
                    return res.send({
                        message: 'unauthorized access',
                        responseCode: 700,
                        error: err
                    })
                } else {
                    var userId = user._id;
                    if (req.body.paymentType === 'Paid') {
                        if (req.body.nameOfProduct && req.body.description && req.body.price) {
                            var postSchema = {
                                userId: userId,
                                nameOfProduct: req.body.nameOfProduct,
                                description: req.body.description,
                                paymentType: req.body.paymentType,
                                price: req.body.price
                            }
                            Post.create(postSchema, (err: any, result: any) => {
                                if (err) {
                                    return res.send({
                                        message: 'db err',
                                        responseCode: 700,
                                        error: err
                                    })
                                } else {
                                    Post.aggregate([
                                        {
                                            $lookup: {
                                                from: 'signups',
                                                localField: 'userId',
                                                foreignField: '_id',
                                                as: 'user'
                                            }
                                        }
                                    ], (err: any, post: any) => {
                                        if (err) {
                                            return res.send({
                                                message: 'db err while aggregating',
                                                responseCode: 300,
                                                error: err
                                            })
                                        } else {

                                            return res.send({
                                                message: 'Post created 1',
                                                responseCode: 200,
                                                status: 200,
                                                post: post
                                            });
                                        }
                                    })
                                }
                            })
                        } else {
                            return res.send({
                                message: 'all fielsd are required 1',
                                responseCode: 100
                            })
                        }
                    } else {
                        if (req.body.nameOfProduct && req.body.description && req.body.paymentType) {
                            var postSchema2 = {
                                userId: userId,
                                nameOfProduct: req.body.nameOfProduct,
                                description: req.body.description,
                                paymentType: req.body.paymentType
                            }
                            Post.create(postSchema2, (err: any, result: any) => {
                                if (err) {
                                    return res.send({
                                        message: 'db err',
                                        responseCode: 700,
                                        error: err
                                    })
                                } else {
                                    Post.aggregate([
                                        {
                                            $lookup: {
                                                from: 'User',
                                                localField: 'userId',
                                                foreignField: '_id',
                                                as: 'user'
                                            }
                                        }
                                    ], (err: any, post: any) => {
                                        if (err) {
                                            return res.send({
                                                message: 'db err while aggregating',
                                                responseCode: 300,
                                                error: err
                                            })
                                        } else {

                                            return res.send({
                                                message: 'Post created 2',
                                                responseCode: 200,
                                                status: 200,
                                                post: post
                                            });
                                        }
                                    })
                                }
                            })

                        } else {
                            return res.send({
                                message: 'all fielsd are required 2',
                                responseCode: 100
                            })
                        }
                    }

                }
            })
        } else {
            return res.send({
                message: 'token required',
                responseCode: 900
            })
        }
    }

    viewPost = function (req: any, res: any) {
        var token = req.headers.token;
        if (token) {
            jwt.verify(token, 'my_secret_key', (err: any, user: any) => {
                if (err) {
                    return res.send({
                        message: 'unauthorized access',
                        responseCode: 700
                    })
                } else {
                    var userId = user._id;
                    Post.find({ userId: userId }, (err: any, result: any) => {
                        if (err) {
                            return res.send({
                                message: 'db err',
                                responseCode: 300,
                                error: err
                            })
                        } else {
                            return res.send({
                                message: 'all posts of user',
                                responseCode: 200,
                                user: user,
                                posts: result
                            })
                        }
                    })
                }
            })
        } else {
            return res.send({
                message: 'token required',
                responseCode: 100
            })
        }
    }

    viewAllPost = function (req: any, res: any) {
        Post.find({}, (err: any, post: any) => {
            console.log(post[1].userId);
            var n =post.length;
            var a = parseInt(n);
            var i =0;
            while(a>0){
                console.log(post[a].userId);
                a--;
            }
            if (err) {
                return res.send({
                    message: 'db err',
                    responseCode: 300,
                    error: err
                })
            } else {
                return res.send({
                    message: 'all posts of all users',
                    responseCode: 200,
                    posts: post
                })
            }
        })
    }


}

export const postController = new PostController();