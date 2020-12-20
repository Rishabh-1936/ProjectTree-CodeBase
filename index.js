const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
require('dotenv/config');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use("/public",express.static(__dirname+"/public"))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect(process.env.MONGO_URL_WITH_2_2,
    err => {
        if(err) throw err;
        else    console.log('database connected');
    })

// mongoose.connect(process.env.MONGO_URL,
//     err => {
//         if(err) throw err;
//         console.log('database connected');
//     })



let homeRoute=require('./routes/home');
let projectListRoute=require('./routes/project-lists');
let projectViewRoute=require('./routes/projectView');
let addProjectDetailsRoute=require('./routes/add-project-details');

app.use('/',homeRoute);
// app.use('/projects',projectViewRoute);
app.use('/projects',projectListRoute);
app.use('/add-project-details',addProjectDetailsRoute);


app.listen(8000 || process.env.PORT,(err)=>{
    if(err)
        throw err;
    console.log("Server started");
})