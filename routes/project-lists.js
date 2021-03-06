const route = require('express').Router();

const projectModel = require('../models/projectModel');
const projectLang = require('../models/projectLang');

route.get('/:lang', (req, res) => {
    projectLang
        .find({ 'lang': req.params.lang })
        .populate('projectlists')
        .exec((err, projects) => {
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                projectLang
                    .find({})
                    .select('lang')
                    .exec((err, lang_obj) => {
                        return res.render('project-list', { 'langs': lang_obj, 'projectLists': projects });
                    });
            }
        });
});

route.get('/:lang/pid/:id', (req, res) => {
    projectModel.find({ 'projectId': req.params.id }, (err, project) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            projectLang.find({})
            .select('lang')
            .exec((err,lang_obj)=>{
                res.render('project-view', { 'langs': lang_obj, 'project': project })
            });
        }
    });
});

route.get('/:lang/pid/:id/download', (req, res) => {
    projectModel.find({ 'projectId': req.params.id }, (err, project) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            projectLang.find({})
            .select('lang')
            .exec((err,lang_obj)=>{
                res.render('project-download-view', { 'langs': lang_obj, 'project': project })
            });
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

module.exports = route;