const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const StudentUpdate = require('../models/studentregistration');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error',()=>{
    console.log('Connection error');
});

router.get('/studentUpdateManagement',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/student_update_ops.html'));
});
router.post('/delete-studentUpdate', (req , res)=>{
    StudentUpdate.deleteOne({_id: req.body._id}, (err, doc)=>{
        if(err){
            console.log(err);
            res.json({msg: 'Error'});
        }else{
            res.json({msg: 'Record Deleted'});
        }
    });
});

router.get('/get-studentUpdate',(req,res)=>{
    StudentUpdate.find().then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/add-studentUpdate',(req,res)=>{
    const studentUpdate = new StudentUpdate({
        name: req.body.name,
        roll_no: req.body.roll_no,
        phone_no: req.body.phone_no,
        email: req.body.email,
        password: req.body.password,
    });
    studentUpdate.save().then((result)=>{
        res.json({
            'info':'Record added',
            'obj': result
        });
    });
});

router.post('/update-studentUpdate',(req,res)=>{

    StudentUpdate.updateOne({_id: req.body._id}, {name: req.body.name,
        roll_no: req.body.roll_no,
        phone_no: req.body.phone_no,
        email: req.body.email,
        password: req.body.password},(err,doc)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                'info' : 'Record Updated',
                'obj' : doc
            });
            console.log(doc);
        }

    })
})


module.exports = router;
