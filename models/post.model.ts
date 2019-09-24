import { ObjectId } from "bson";

var mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
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
})

var post = mongoose.model('post', postSchema);
module.exports = post;