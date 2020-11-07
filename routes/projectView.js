const { response } = require('express');
const express=require('express');
const route=express.Router();

const projectModel=require('../models/projectModel');

route.get('/:id',(req,res)=>{
    projectModel.find({'projectId':req.params.id},(err,project)=>{
        if(err){
            console.log(err);
            throw err;
        }
        else{
            return res.render('project-view',{project:project});
        }
    });
});


module.exports=route;