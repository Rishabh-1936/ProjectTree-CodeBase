const mongoose= require("mongoose");

var projectLangSchema=new mongoose.Schema({
    lang:String,
    projectlists:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'projectmodels'
        }
    ]
});


// Autopopulate is making the projectlists not able to deselect this field.

// var projectLangSchema=new mongoose.Schema({
//     lang:String,
//     projectlists:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'projectmodels',
//             autopopulate:true
//         }
//     ]
// });

projectLangSchema.plugin(require('mongoose-autopopulate'));

module.exports = new mongoose.model('projectlangs',projectLangSchema,'projectlangs');