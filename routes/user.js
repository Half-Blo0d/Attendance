const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const StudentRegistration = require('../models/studentregistration');
const attendances = require('../models/attendances.js');
const db = require('../config/db');




mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
    console.log('Connection Error');
});
router.get('/get-user',(req,res)=>{
    let session = req.session
    StudentRegistration.findOne({email: session.user}).then((response)=>{
        console.log(session.user);
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/get-user-info',(req,res)=>{
    let session = req.session
    let cat
    StudentRegistration.findOne({email: session.user}).then((response)=>{
        cat = response.name
        console.log(cat)
        attendances.find({name: response.name}).then((respo)=>{
            console.log(respo)
            res.json(respo);
        }).catch((err)=>{
            console.log(err);
        });
    });


});
module.exports = router;
