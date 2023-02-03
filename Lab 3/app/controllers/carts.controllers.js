const carts =('../models/carts.models')
const { json } = require("express/lib/response")
const joi = require("joi") 

const getAll = (req, res) => {
    carts.getAllCarts((err, num_rows, results) => {
        if(err) return res.sendStatus(500)
        console.log("Number of Articles: " + num_rows)
        return res.status(200).send(results)
    })
}

const create = (req, res) => {
    const schema = Joi.object({
        item_name: Joi.string().required(),
        item_price: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required()
    });

    console.log(schema.validate(req.body));

    console.log(error);

    if(error) return res.status(400).send(error.details[0].message);

    let cart = Object.assign({}, req.body);

    carts.addNewCart(cart, (err, id) => {
        if(err) return res.sendStatus(500)

        return res.status(201).send({item_id: id})
    })
}

const getOne  = (req, res) => {
    let id = parseInt(req.params.id);
    if (!validator.isValidId(id)) return res.sendStatus(404);

    users.getOne(id, function(err, results){
        if (err) {
            log.warn(`users.controllers.get_one: no results found`);
            return res.sendStatus(404);
        }else{
            res.sendStatus(200).json(results);
        }
    });
}

const update = (req, res) => {
    const id = parseInt(req.params.id);
    return res.sendStatus(500);
}

const deleteCart = (req, res) => {
    return res.sendStatus(500);
}

module.exports = {
    getAll: getAll,
    create: create,
    getOne: getOne,
    update: update,
    deleteCart: deleteCart
};