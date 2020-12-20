const mongoose= require("mongoose");

var projectContactSchema=new mongoose.Schema({
    name:String,
    email:String,
    reason:String,
    role:String,
    message:String
});


module.exports = new mongoose.model('projectcontact',projectContactSchema,'projectcontact');