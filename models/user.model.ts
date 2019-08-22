var mongoose = require('mongoose');

let signUpSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

var Signup = mongoose.model('Signup', signUpSchema);
module.exports = Signup;