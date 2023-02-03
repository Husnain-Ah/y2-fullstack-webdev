const comments = require("../controllers/comments.controllers.js");
const auth = require("../libs/middleware");

module.exports = function (app) {

    app.route("/articles/:article_id/comments")
        .get(comments.getComment)
        .post(comments.create)

    app.route("/comments/:comment_id")
        .delete(auth.isAuthenticated, comments.deleteComment)

}