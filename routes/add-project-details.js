const route=require('express').Router();
const projectModel=require('../models/projectModel');
const projectLang=require('../models/projectLang');

route.get('/',(req,res)=>{  
    projectModel.find({})
    .select('projectId')
    .exec((err,projectIds)=>{
        if(err){
            console.log('Error in fetching',err);
            return res.redirect('/');
        }
        else{
            res.render('add-project-details',{projectIds:projectIds});
        }
    });
});

route.post('/',(req,res)=>{
    const obj = dataFetch(req);
    console.log(obj);
    
    projectModel.create(new projectModel(obj),(err,project)=>{
        if(err){
            console.log('Error in adding the project',err);
            return res.redirect('/add-project-details');
        }
        else{
            console.log('Project added successfully',project);
            
            projectLang.findOneAndUpdate(
                {lang:obj.lang},
                {"$push":{"projectlists":project._id}},
                { "new": true, "upsert": true },
                (err,projectRef)=>{
                    if(err){
                        console.log('Reference is not stored');
                    }
                    else{
                        console.log(projectRef,"Reference stored");
                    }
                }
            );
            
            return res.redirect('/add-project-details');
        }
    });

});

function dataFetch(req){
    let obj={
        projectId : req.body.projectId,
        projectName : req.body.projectName,
        projectDescUrl : req.body.projectDescUrl,
        projectVideoUrl : req.body.projectVideoUrl,
        projectDownloadUrl : req.body.projectDownloadUrl,
        downloads : req.body.projectDownloads,
        likes : req.body.projectLikes,
        tags : (req.body.projectTags).split(","),
        lang : req.body.projectLang,
        share : req.body.projectShare,
        getHelp : req.body.projectHelp
    }
    return obj;
}


module.exports=route;