const express = require("express");
const res = require("express/lib/response");
const app = express();
app.use(express.json());

const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],
})

const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err){
        console.err(err.message);
        throw err;
    }else{
        console.log("Connected to the SQLite DB");

        db.run(` CREATE TABLE carts (
            item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name TEXT NOT NULL,
            item_price INTEGER NOT NULL,
            quantity INTEGER NOT NULL
        )
        `, (err) => {
            if(err){
                console.log("Carts table already exists");
            }else{
                console.log("Carts table created")
            }
        });

    }
});

const port = 3000;

// let carts = [];
// let shop_id = 1;

app.post("/carts", (req, res) => {

    const schema = Joi.object({
       // item_id: Joi.number().min(1).required(),
        item_name: Joi.string().required(),
        item_price: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required()
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sql = 'INSERT INTO carts (item_name, item_price, quantity) VALUES (?,?,?)'
    let values = [req.body.item_name, req.body.item_price, req.body.quantity];

    db.run(sql, values, function(err){
        if(err) return done(err)

        return res.status(201).send({
            item_id: this.lastID,
            item_name: req.body.item_name,
            item_price: req.body.item_price,
            quantity: req.body.quantity
        });
    })

});

app.get("/carts", (req, res) => { 
    let results = [];

    db.each(
        "SELECT * FROM CARTS",
        [],
        (err,row) => {
            if(err) return res.status(400).send("Couldn't get carts");

            results.push({
                item_id: row.item_id,
                item_name: row.item_name,
                item_price: row.item_price,
                quantity: row.quantity
            })
        },
        (err, num_rows) => {
            if(err) return res.status(400).send("Couldn't get carts");

            return res.send(results);
        }
    )
});


app.get("/carts/:id", (req,res) => { 

    let id = parseInt(req.params.id);
    const sql = 'SELECT * FROM carts WHERE item_id=?'

    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).send("Something has broken")
        if (!row) return res.status(404).send("Not found")

        return res.send({
            item_id: row.item_id,
            item_name: row.item_name,
            item_price: row.item_price,
            quantity: row.quantity
        })
    })
});

app.delete("/carts/:id", (req, res) => {
    let id = parseInt(req.params.id);

    const cart = carts.find(temp => temp.item_id === id);
    if(!cart) return res.status(404).send("No cart found");

    const index = carts.indexOf(cart);
    carts.splice(index, 1);

    return res.status(200).send(cart.item_name + " deleted");
})

app.patch("/carts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const schema = Joi.object({
        item_name: Joi.string().required(),
        item_price: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sql = 'UPDATE carts SET item_name=?, item_price=?, quantity=? WHERE item_id=?'
    const values = [req.body.item_name, req.body.item_price, req.body.quantity, id];

    db.run(sql, values, (err) => {
        if (err) return res.status(500).send("Something has broken")
        return res.status(200).send("");
    })
});

app.listen(port, () => {
    console.log("App is listing on port: " + port);
});