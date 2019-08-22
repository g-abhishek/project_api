import mongoose from 'mongoose';

let dev_db_url = 'mongodb://localhost:3002/';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
    console.log("Connected To Database");
});

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports.mongoose;