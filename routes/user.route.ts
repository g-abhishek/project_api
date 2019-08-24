import { userController } from '../controllers/user.controller';

var Express = require('express');
import { Express } from 'express';


export default class UserRoute {

    signUp(app: Express){
        app.post('/signup', userController.signUp);
    }

    userRoute(app: Express){
        this.signUp(app)
    }

}
