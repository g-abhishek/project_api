"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bson_1 = require("bson");
var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    userId: {
        type: bson_1.ObjectId,
        required: true
    },
    nameOfProduct: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true,
        default: "free"
    },
    price: {
        type: Number,
        default: 0
    },
    postCreationDate: {
        type: Date,
        default: Date
    },
    postImage: {
        type: String,
        default: 'https://unknown-ag.github.io/sheetal_academy/ProjectImages/abhishek.jpeg'
    }
});
var post = mongoose.model('post', postSchema);
module.exports = post;
//# sourceMappingURL=post.model.js.map