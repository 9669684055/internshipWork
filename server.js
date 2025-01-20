const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Feedback = require('./models/schema.js');
const path = require('path');


const MONGO_URL ="mongodb://127.0.0.1:27017/feedback";
 
main().then(() => 
{console.log('Connected to db')})
.catch(err =>{
    console.log(err);
});

async function main() {
await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/" , (req, res) => {
    res.send("Route is working");
});

app.get("/testSchema" , async (req, res) => {
    let sampleFeedback = new Feedback ({
     name: " Vivek yadav",
     contact: "9669684055",
     email: "vy7052540@gmail.com",
     feedbackMessage: "This is for test a schema ",
    })
    await sampleFeedback.save();
    console.log("sample was saved");
    res.send("successful testing");
});

app.get("/feedbacks" , async(req, res) => {
const allFeedbacks = await Feedback.find({});
res.render("pages/index", {allFeedbacks});
});

app.listen(3000 , () => {
    console.log("server is listening to port :3000");
});