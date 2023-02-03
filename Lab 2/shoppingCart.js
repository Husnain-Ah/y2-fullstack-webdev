const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

let carts = [];
let shop_id = 1;

app.post("/carts", (req, res) => {

    let cart = {
        item_id: shop_id,
        item_name: req.body.name,
        item_price: req.body.item_price,
        quantity: req.body.quantity,
    };

    carts.push(cart);
    shop_id = shop_id + 1;

    return res.status(201).send(cart);

});

app.get("/carts", (req, res) => {               
    let number_of_items = 0;
    let total_price = 0;
    let i=0;

    carts.forEach((item) => {
        number_of_items += item.quantity;
        total_price += item.item_price * item.quantity

        i++;

        if(i === carts.length){
            return res.status(200).send({
                "number_of_items": number_of_items,
                "total_price": total_price,
                "items": carts
            })
        }
    })
    
})


app.get("/carts/:id", (req,res) => { 

    let id = parseInt(req.params.id);

    const cart = carts.find(temp => temp.item_id === id);
    if(!cart) return res.status(404).send("No cart found");

    return res.status(200).send(cart);
})

app.delete("/carts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const sql = 'DELETE FROM carts WHERE item_id=?'

        db.run(sql, [id], (err) => {
            if (err) return res.status(500).send("Somethings broke")
            return res.status(200).send('');
        })

});

app.patch("/carts/:id", (req, res) => {
    let id = parseInt(req.params.id);

    const cart = carts.find(temp => temp.item_id === id);
    if(!cart) return res.status(404).send("No cart found");

     if(cart.quantity != req.body.quantity){
         cart.quantity = req.body.quantity
     }
    return res.status(200).send("The quantity has been updated");
})

app.listen(port, () => {
    console.log("App is listing on port: " + port);
});