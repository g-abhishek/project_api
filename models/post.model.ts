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
    }
})

var post = mongoose.model('post', postSchema);
module.exports = post;