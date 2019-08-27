"use strict";
var mongoose = require('mongoose');
var signUpSchema = new mongoose.Schema({
    mobile: {
        type: Number
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    },
    department: {
        type: String
    },
    college: {
        type: String
    },
    gender: {
        type: Number,
        default: 1
    },
    isRegistrationVarified: {
        type: Boolean,
        default: false
    }
});
var Signup = mongoose.model('Signup', signUpSchema);
module.exports = Signup;
//# sourceMappingURL=user.model.js.map