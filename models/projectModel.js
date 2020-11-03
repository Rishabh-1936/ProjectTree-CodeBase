const mongoose = require("mongoose");
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const projectSchema = mongoose.Schema({
    projectId:{
        type:String,
        unique:'Please type unique values',
        required:true
    },
    projectName : String,
    projectDescUrl : String,
    projectVideoUrl : String,
    downloads : {
        type:Number,
        validate:{
            validator:function(download){
                return download>0;
            },
            message:'Downloads should be positive'
        }
    },
    likes : Number,
    tags : Array,
    lang : String,
    share:String,
    getHelp:Boolean
});

projectSchema.plugin(beautifyUnique);
module.exports = new mongoose.model("projectmodels",projectSchema,"projectmodels");