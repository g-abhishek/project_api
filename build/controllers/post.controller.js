"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Post = require('../models/post.model');
var jwt = require('jsonwebtoken');
var base64ToImage = require('base64-to-image');
var PostController = /** @class */ (function () {
    function PostController() {
        this.createPost = function (req, res) {
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
                        var optionalObj = { 'fileName': new Date().getTime() + '-postImage', 'type': 'png' };
                        var imageInfo = base64ToImage(data, 'public/postImage/', optionalObj);
                        var pathname = "http://192.168.1.107:3002" + "/postImage/" + imageInfo.fileName;
                        console.log(imageInfo);
                        console.log(pathname);
                        //--------base64str to image end --------
                        var userId = user._id;
                        if (req.body.paymentType === 'Paid') {
                            if (req.body.nameOfProduct && req.body.description && req.body.price) {
                                var postSchema = {
                                    userId: userId,
                                    nameOfProduct: req.body.nameOfProduct,
                                    description: req.body.description,
                                    paymentType: req.body.paymentType,
                                    price: req.body.price,
                                    postImage: pathname
                                };
                                Post.create(postSchema, function (err, result) {
                                    if (err) {
                                        return res.send({
                                            message: 'db err',
                                            responseCode: 700,
                                            error: err
                                        });
                                    }
                                    else {
                                        return res.send({
                                            message: 'Post created 1',
                                            responseCode: 200,
                                            status: 200,
                                            post: result
                                        });
                                    }
                                });
                            }
                            else {
                                return res.send({
                                    message: 'all fielsd are required 1',
                                    responseCode: 100
                                });
                            }
                        }
                        else {
                            if (req.body.nameOfProduct && req.body.description && req.body.paymentType) {
                                var postSchema2 = {
                                    userId: userId,
                                    nameOfProduct: req.body.nameOfProduct,
                                    description: req.body.description,
                                    paymentType: req.body.paymentType,
                                    postImage: pathname
                                };
                                Post.create(postSchema2, function (err, result) {
                                    if (err) {
                                        return res.send({
                                            message: 'db err',
                                            responseCode: 700,
                                            error: err
                                        });
                                    }
                                    else {
                                        return res.send({
                                            message: 'Post created 2',
                                            responseCode: 200,
                                            status: 200,
                                            post: result
                                        });
                                    }
                                });
                            }
                            else {
                                return res.send({
                                    message: 'all fielsd are required 2',
                                    responseCode: 100
                                });
                            }
                        }
                    }
                });
            }
            else {
                return res.send({
                    message: 'token required',
                    responseCode: 900
                });
            }
        };
        this.viewPost = function (req, res) {
            var token = req.headers.token;
            if (token) {
                jwt.verify(token, 'my_secret_key', function (err, user) {
                    if (err) {
                        return res.send({
                            message: 'unauthorized access',
                            responseCode: 700
                        });
                    }
                    else {
                        var userId = user._id;
                        Post.find({ userId: userId }, function (err, result) {
                            if (err) {
                                return res.send({
                                    message: 'db err',
                                    responseCode: 300,
                                    error: err
                                });
                            }
                            else {
                                return res.send({
                                    message: 'all posts of user',
                                    responseCode: 200,
                                    user: user,
                                    posts: result
                                });
                            }
                        });
                    }
                });
            }
            else {
                return res.send({
                    message: 'token required',
                    responseCode: 100
                });
            }
        };
        this.viewAllPost = function (req, res) {
            // const numOfItems = parseInt(req.query.numOfItems);
            // const pageNum = parseInt(req.query.pageNum);
            // if (pageNum > 0) {
            Post.find({}, function (err, post) {
                if (err) {
                    return res.send({
                        message: 'db err',
                        responseCode: 300,
                        error: err
                    });
                }
                else {
                    Post.aggregate([
                        {
                            $lookup: {
                                from: 'signups',
                                localField: 'userId',
                                foreignField: '_id',
                                as: 'user'
                            }
                        },
                        {
                            $sort: { postCreationDate: -1 }
                        }
                        // {
                        //     $skip: numOfItems * (pageNum - 1)
                        // },
                        // {
                        //     $limit: numOfItems
                        // }
                    ], function (err, posts) {
                        if (err) {
                            return res.send({
                                message: 'db err while aggregating',
                                responseCode: 300,
                                error: err
                            });
                        }
                        else {
                            return res.send({
                                message: 'all user posts',
                                responseCode: 200,
                                status: 200,
                                post: posts
                            });
                        }
                    });
                }
            });
            // } else {
            //     return res.send({
            //         message: 'Page number should be greater than 0',
            //         responseCode: 100
            //     })
            // }
        };
        this.ViewPostById = function (req, res) {
            var productId = req.body.productId;
            if (productId) {
                Post.aggregate([
                    {
                        $match: {
                            _id: mongoose.Types.ObjectId(productId)
                        }
                    },
                    {
                        $lookup: {
                            from: 'signups',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user'
                        }
                    }
                ], function (err, product) {
                    if (err) {
                        return res.send({
                            message: 'db err while aggregating',
                            responseCode: 300,
                            error: err
                        });
                    }
                    else {
                        return res.send({
                            message: 'product by id',
                            responseCode: 200,
                            product: product
                        });
                    }
                });
            }
            else {
                return res.send({
                    message: 'productId required',
                    responseCode: 100
                });
            }
        };
    }
    return PostController;
}());
exports.postController = new PostController();
//# sourceMappingURL=post.controller.js.map