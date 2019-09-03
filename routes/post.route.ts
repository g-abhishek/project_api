
import { Express } from 'express';
import {postController} from '../controllers/post.controller';

export default class PostRoute{
    createPost(app: Express){
        app.post('/post', postController.createPost);
    }
    viewPost(app: Express){
        app.get('/post', postController.viewPost);
    }
    viewAllPost(app: Express){
        app.get('/viewallpost', postController.viewAllPost);
    }

    postRoute(app:Express){
        this.createPost(app);
        this.viewPost(app);
        this.viewAllPost(app);
    }
}
