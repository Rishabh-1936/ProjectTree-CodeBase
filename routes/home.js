const express=require('express');
const route=express.Router();

const projectModel=require('../models/projectModel');
const projectLang=require('../models/projectLang');
const projectcontact=require('../models/projectContactForm');
const projectnewsletter=require('../models/projectNewsletter');

route.get('/',(req,res)=>{

    projectLang.find({},{projectlists:{$slice:5}})
    .populate('projectlists')
    .exec((err,projects)=>{
       if(err) {
           console.log("Error occurred");
       }
       else{
        //    console.log("Fetch successfully ",projects);
           res.render('home',{projectLists:projects});
       }
    });
});

route.get('/about',(req,res)=>{
    projectLang
        .find({})
        .select('lang')
        .exec((err,langs)=>{
            res.render('about', { 'projectLists': langs })
        });
});

route.get('/contact',(req,res)=>{
    projectLang
    .find({})
    .select('lang')
    .exec((err,langs)=>{
        res.render('contact', { 'projectLists': langs })
    });
});

route.post('/:id/like',(req,res)=>{
    
    projectModel.findOneAndUpdate({'projectId':req.params.id},{$inc:{'likes':req.body.val}})
    .exec((err,project)=>{
        // console.log('Like -> ',project)
        // console.log(req.body.status)
    })
});

route.post('/contactInfo',(req,res)=>{
    let obj={
        name:req.body.name,
        email:req.body.email,
        reason:req.body.reason,
        role:req.body.role,
        message:req.body.msg
    }
    projectcontact.create(new projectcontact(obj),(err,response)=>{
        if(err){
            console.log('Error ',err);
        }
        else{
            console.log('Contact form submitted');
        }
    });
});

route.post('/subscribe',(req,res)=>{
    let obj={
        email:req.body.email
    }
    projectnewsletter.create(new projectcontact(obj),(err,response)=>{
        if(err){
            console.log('Error ',err);
        }
        else{
            console.log('subscription added');
        }
    });
});




module.exports=route;