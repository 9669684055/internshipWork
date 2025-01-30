const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Feedback = require('./models/schema.js');
const path = require('path');
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/feedback";

main().then(() => {
  console.log('Connected to db');
}).catch(err => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

app.get("/", (req, res) => {
  res.send("Route is working");
});

// app.get("/testSchema", async (req, res) => {
//   let sampleFeedback = new Feedback({
//     name: "Vivek Yadav",
//     contact: "9669684055",
//     email: "vy7052540@gmail.com",
//     feedbackMessage: "This is for test a schema",
//   });
//   await sampleFeedback.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });


app.get("/feedbacks", async (req, res) => {
  const {name , contact , feedMassege , email} = req.body;
  const allFeedbacks = await Feedback.find({});
  res.render("pages/index", { allFeedbacks });
});
  
//new route
app.get("/feedbacks/create" , (req, res) => {
  res.render("pages/create");
});

app.post("/feedbacks" , async(req, res) => {
const newFeedback = new Feedback (req.body.feedback);
// newFeedback.image = { url, filename};
await newFeedback.save();
res.redirect("/feedbacks");

});

//show route
app.get("/feedbacks/:id" , async (req, res) =>{
  let {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid feedback ID format");
}
  const feedback = await Feedback.findById(id);
  res.render("pages/show" , { feedback });
});


app.listen(3000, () => {
  console.log("server is listening to port :3000");
});
