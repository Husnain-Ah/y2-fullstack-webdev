const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

let users = [];
let next_id = 1;

app.post("/users", (req,res) => {

    let user = {
        user_id: next_id,
        user_name: req.body.name
    }

    users.push(user);
    next_id = next_id + 1;

    return res.status(201).send(user);
})

app.get("/users", (req,res) => {
    return res.status(200).send(users);
    
})

app.get("/users/:id", (req,res) => {

    let id = parseInt(req.params.id);

    const user = users.find(temp => temp.user_id === id);
    if(!user) return res.status(404).send("No user found");

    return res.status(200).send(users);
    
})

app.delete("/users/:id", (req,res) => {
    let id = parseInt(req.params.id);

    const user = users.find(temp => temp.user_id === id);
    if(!user) return res.status(404).send("No user found");

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).send("User deleted");

})

app.patch("/users/:id", (req,res) => {
    let id = parseInt(req.params.id);
    
    const user = users.find(temp => temp.user_id === id);
    if(!user) return res.status(404).send("No user found");

        if (user.user_name != req.body.name){
            user.user_name = req.body.name
        }

    return res.status(200).send("The user has been updated");
})

app.listen(port, () => {
    console.log("App is listening on port : " + port);
})