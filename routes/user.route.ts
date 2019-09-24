import { userController } from '../controllers/user.controller';

var upload = require('../config/multer.config');

import { Express } from 'express';


export default class UserRoute {

    signUp(app: Express) {
        app.post('/signup', userController.signUp);
    }
    registerUser(app: Express) {
        app.post('/registeruser', userController.registerUser);
    }
    getSignedUser(app: Express) {
        app.post('/getsigneduser', userController.getSignedUser);
    }
    user(app: Express) {
        app.get('/user', userController.user);
    }

    editUser(app: Express) {
        app.post('/edituser', userController.editUser);
    }

    profilePic(app: Express) {
        app.post('/profilePic', userController.profilePic);
    }

    userRoute(app: Express) {
        this.signUp(app)
        this.registerUser(app)
        this.getSignedUser(app);
        this.user(app);
        this.editUser(app);
        this.profilePic(app);
    }

}
