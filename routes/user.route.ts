import { userController } from '../controllers/user.controller';

var Express = require('express');
import { Express } from 'express';


export default class Route {

    hello(app: any) {
        app.get('/', function (req: any, res: any) {
            return res.send('hello abhishek')
        })
        app.get('/anil', function (req: any, res: any) {
            return res.send('hello Anil')
        })
    }

    signUp(app: Express){
        app.post('/signup', userController.signUp);
    }

    Route(app: Express){
        this.signUp(app)
    }

}
