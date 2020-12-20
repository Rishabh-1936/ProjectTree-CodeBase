const mongoose= require("mongoose");

var projectNewsletterSchema=new mongoose.Schema({
    email:String
});


module.exports = new mongoose.model('projectnewsletter',projectNewsletterSchema,'projectnewsletter');