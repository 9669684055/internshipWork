const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./models/schema.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/Feedback";
 
main().then(() => console.log('Connected to db'))
.catch(err =>{
    console.log(err);
})

async function main() {
await mongoose.connect(MONGO_URL);
}

app.get("/" , (req, res) => {
    res.send("Route is working");
})

app.listen(3000 , () => {
    console.log("server is listening to port :3000");
});