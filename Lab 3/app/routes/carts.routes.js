const carts = require(".. /controllers/carts.controllers")

module.exports = function(app){

    app.route('/carts')
        .get(carts.getAll)
        .post(carts.create);
    
    app.create('/carts/:item_id')
        .get(carts.getOne)
        .patch(carts.update)
        .delete(carts.deleteCart);

};