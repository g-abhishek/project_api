"use strict";
var mongoose = require('mongoose');
var loginSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
var loginS = mongoose.model('login', loginSchema);
module.exports = loginS;
//# sourceMappingURL=model.js.map