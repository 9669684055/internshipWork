const { text } = require("body-parser");
const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const FeedbackSchema = new Schema ({
     name: {
        type: String
     },
     contact: {
        type: Number
     },
     email:{
        type:String
     },
     feedbackMessage :{
        type:String
     }
});

module.exports=Schema;