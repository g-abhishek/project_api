import { userController } from '../controllers/user.controller';

var Express = require('express');
import { Express } from 'express';


export default class UserRoute {

    signUp(app: Express){
        app.post('/signup', userController.signUp);
    }
    registerUser(app: Express){
        app.post('/registeruser', userController.registerUser);
    }
    getSignedUser(app: Express){
        app.post('/getsigneduser', userController.getSignedUser);
    }

    userRoute(app: Express){
        this.signUp(app)
        this.registerUser(app)
        this.getSignedUser(app);
    }

}
