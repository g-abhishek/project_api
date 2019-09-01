var mongoose = require('mongoose');

let signUpSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        index: {unique:true}
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
})

var Signup = mongoose.model('Signup', signUpSchema);
module.exports = Signup;