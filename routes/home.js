const express=require('express');
const route=express.Router();

const projectModel=require('../models/projectModel');
const projectLang=require('../models/projectLang');

route.get('/',(req,res)=>{

    projectLang.find({},{projectlists:{$slice:5}})
    .populate('projectlists')
    .exec((err,projects)=>{
       if(err) {
           console.log("Error occurred");
       }
       else{
           console.log("Fetch successfully ",projects);
           res.render('home',{projectLists:projects});
       }
    });
});

module.exports=route;