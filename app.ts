
var express = require('express');
import Route from './routes/user.route';
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const userRoute = new Route();
userRoute.Route(app);


var port = process.env.PORT || 3002;

// app.get('/home/', function(req:any, res:any){
//     return res.send("home page");
// })






const route = new Route();
route.hello(app);

app.listen(port, () => {
    console.log('server is running on port ' + port);
})

// app.listen(3002)