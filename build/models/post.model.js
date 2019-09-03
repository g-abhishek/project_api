"use strict";
var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    userId: {
        type: String,
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
});
var post = mongoose.model('post', postSchema);
module.exports = post;
//# sourceMappingURL=post.model.js.map