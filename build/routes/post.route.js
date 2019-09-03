"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_controller_1 = require("../controllers/post.controller");
var PostRoute = /** @class */ (function () {
    function PostRoute() {
    }
    PostRoute.prototype.createPost = function (app) {
        app.post('/post', post_controller_1.postController.createPost);
    };
    PostRoute.prototype.viewPost = function (app) {
        app.get('/post', post_controller_1.postController.viewPost);
    };
    PostRoute.prototype.viewAllPost = function (app) {
        app.get('/viewallpost', post_controller_1.postController.viewAllPost);
    };
    PostRoute.prototype.postRoute = function (app) {
        this.createPost(app);
        this.viewPost(app);
        this.viewAllPost(app);
    };
    return PostRoute;
}());
exports.default = PostRoute;
//# sourceMappingURL=post.route.js.map