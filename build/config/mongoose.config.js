"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dev_db_url = 'mongodb+srv://Abhishek:Abhishek@abhishek-cluster-jxsrb.mongodb.net/test?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose_1.default.connect(mongoDB, { useNewUrlParser: true }).then(function () {
    console.log("Connected To Database");
});
mongoose_1.default.Promise = global.Promise;
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports.mongoose;
//# sourceMappingURL=mongoose.config.js.map