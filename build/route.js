"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var loginModel = require('model');
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.prototype.hello = function (app) {
        app.get('/', function (req, res) {
            return res.send('hello abhishek');
        });
        app.get('/anil', function (req, res) {
            return res.send('hello Anil');
        });
    };
    return Route;
}());
exports.default = Route;
//# sourceMappingURL=route.js.map