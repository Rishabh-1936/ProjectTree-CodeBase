const route=require('express').Router();

const projectModel=require('../models/projectModel');
const projectLang=require('../models/projectLang');

let lang_obj={};

route.get('/:lang',(req,res)=>{
    projectLang.find({'lang':req.params.lang})
    .populate('projectlists')
    .exec((err,projects)=>{
        if(err){
            console.log(err);
            throw err;
        }
        else{
            projectLang.find()
            .select('lang')
            .exec((err,langs)=>{
                lang_obj=langs;
                res.render('project-list',{'langs':langs,'projectLists':projects});
                // console.log(`Projects of lang is listed`,langs);
            });
        }
    });
});

route.get('/:lang/pid/:id',(req,res)=>{
    projectModel.find({'projectId':req.params.id},(err,project)=>{
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.render('project-view',{'langs':lang_obj,'project':project})
        }
    });
});

route.get('/:lang/pid/:id/download',(req,res)=>{
    projectModel.find({'projectId':req.params.id},(err,project)=>{
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.render('project-download-view',{'langs':lang_obj,'project':project})
        }
    });
});

// route.get('/:lang/page/:pgno',(req,res)=>{
//     projectLang.find({'lang':req.params.lang},{projectlists:{$slice: 1}})
//     .populate('projectlists')
    
//     .exec((err,projects)=>{
//         if(err){
//             console.log(err);
//             throw err;
//         }
//         else{
//             console.log(`Projects of lang  ${req.params.lang} is listed`,projects);
//             res.send(projects)
//             // return res.render('project-list',{projectLists:projects});
//         }
//     });
// });

module.exports=route;