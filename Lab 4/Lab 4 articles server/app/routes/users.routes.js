const users = require("../controllers/users.controllers");
const auth = require("../libs/middleware");

module.exports = function (app) {

    app.route("/users")
        .get(auth.isAuthenticated, users.getAll).post(users.create)
    // .post(auth.isAuthenticated,users.create)

    app.route("/login")
        .post(users.login)

    app.route("/logout")
        .post(auth.isAuthenticated, users.logout)
}
