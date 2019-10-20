var mongoose = require('mongoose');
var Post = require('../models/post.model');
var jwt = require('jsonwebtoken');
var base64ToImage = require('base64-to-image');
var cloudinary = require('cloudinary').v2;

class PostController {

    createPost = function (req: any, res: any) {
        var token = req.headers.token;
        var Var1 = req.body.file;
        var data = 'data:image/jpeg;base64,';
        data += Var1;
        if (token) {
            jwt.verify(token, 'my_secret_key', (err: any, user: any) => {
                if (err) {
                    return res.send({
                        message: 'unauthorized access',
                        responseCode: 700,
                        error: err
                    })
                } else {
                    // base64str to image
                    var imgUrl = "https://unknown-ag.github.io/sheetal_academy/ProjectImages/abhishek.jpeg";
                    cloudinary.uploader.upload(data, function(error:any, result:any) {
                             imgUrl = result.url;
                   

                    // var optionalObj = { 'fileName': new Date().getTime() + '-postImage', 'type': 'png' };
                    // var imageInfo = base64ToImage(data, 'public/postImage/', optionalObj);
                    // var pathname = "http://192.168.1.107:3002" + "/postImage/" + imageInfo.fileName;
                    // console.log(imageInfo);
                    // console.log(pathname);
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
                                postImage: imgUrl
                            }
                            Post.create(postSchema, (err: any, result: any) => {
                                if (err) {
                                    return res.send({
                                        message: 'db err',
                                        responseCode: 700,
                                        error: err
                                    })
                                } else {
                                    return res.send({
                                        message: 'Post created 1',
                                        responseCode: 200,
                                        status: 200,
                                        post: result
                                    });
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
                                paymentType: req.body.paymentType,
                                postImage: imgUrl
                            }
                            Post.create(postSchema2, (err: any, result: any) => {
                                if (err) {
                                    return res.send({
                                        message: 'db err',
                                        responseCode: 700,
                                        error: err
                                    })
                                } else {

                                    return res.send({
                                        message: 'Post created 2',
                                        responseCode: 200,
                                        status: 200,
                                        post: result
                                    });
                                }
                            })

                        } else {
                            return res.send({
                                message: 'all fielsd are required 2',
                                responseCode: 100
                            })
                        }
                    }
                });

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
        // const numOfItems = parseInt(req.query.numOfItems);
        // const pageNum = parseInt(req.query.pageNum);
        // if (pageNum > 0) {
        Post.find({}, (err: any, post: any) => {
            if (err) {
                return res.send({
                    message: 'db err',
                    responseCode: 300,
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
                    },
                    {
                        $sort: {postCreationDate:-1}
                    }
                    // {
                    //     $skip: numOfItems * (pageNum - 1)
                    // },
                    // {
                    //     $limit: numOfItems
                    // }
                ], (err: any, posts: any) => {
                    if (err) {
                        return res.send({
                            message: 'db err while aggregating',
                            responseCode: 300,
                            error: err
                        })
                    } else {

                        return res.send({
                            message: 'all user posts',
                            responseCode: 200,
                            status: 200,
                            post: posts
                        });
                    }
                })

            }
        })
        // } else {
        //     return res.send({
        //         message: 'Page number should be greater than 0',
        //         responseCode: 100
        //     })
        // }

    }

    ViewPostById = function (req: any, res: any) {
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
            ], (err: any, product: any) => {
                if (err) {
                    return res.send({
                        message: 'db err while aggregating',
                        responseCode: 300,
                        error: err
                    })
                } else {
                    return res.send({
                        message: 'product by id',
                        responseCode: 200,
                        product: product
                    })
                }
            })
        } else {
            return res.send({
                message: 'productId required',
                responseCode: 100
            })
        }
    }

}




export const postController = new PostController();