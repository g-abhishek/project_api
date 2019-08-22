"use strict";
var mongoose = require('mongoose');
var signUpSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});
var Signup = mongoose.model('Signup', signUpSchema);
module.exports = Signup;
//# sourceMappingURL=user.model.js.map