const articles = require("../controllers/articles.controllers");

module.exports = function(app){

    app.route("/articles")
        .get(articles.getAll)
        .post(articles.create);

        app.route("/articles/:article_id")
        .get(articles.getOne)
        .patch(articles.updateArticle)
        .delete(articles.deleteArticle);
}