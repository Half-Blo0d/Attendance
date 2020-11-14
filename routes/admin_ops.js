const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const StudentRegistration = require('../models/studentregistration');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
    console.log('Connection Error');
});

router.get("/studentUpdateManagement", (req, res)=>{
    console.log("Inside Test method");
    let admin = req.session;
    console.log(admin.user);
    if(admin.user){
        const filePath = path.join(__dirname, '../public/student_update_ops.html') ;
        res.sendFile(filePath);

    } else{
        const filePath = path.join(__dirname, '../public/index.html') ;
        res.sendFile(filePath);
    }
});

router.get("/subjects", (req, res)=>{
    console.log("Inside Test method");
    let admin = req.session;
    console.log(admin.user);
    if(admin.user){
        const filePath = path.join(__dirname, '../public/subject_ops.html') ;
        res.sendFile(filePath);

    } else{
        const filePath = path.join(__dirname, '../public/index.html') ;
        res.sendFile(filePath);
    }
});
module.exports = router;
