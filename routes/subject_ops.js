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
router.get("/dbms", (req, res)=>{
    console.log("Inside Test method");
    let admin = req.session;
    console.log(admin.user);
    if(admin.user){
        const filePath = path.join(__dirname, '../public/subjects/dbms_ops.html') ;
        res.sendFile(filePath);

    } else{
        const filePath = path.join(__dirname, '../public/index.html') ;
        res.sendFile(filePath);
    }
});
router.get("/tcs", (req, res)=>{
    console.log("Inside Test method");
    let admin = req.session;
    console.log(admin.user);
    if(admin.user){
        const filePath = path.join(__dirname, '../public/subjects/tcs_ops.html') ;
        res.sendFile(filePath);

    } else{
        const filePath = path.join(__dirname, '../public/index.html') ;
        res.sendFile(filePath);
    }
});
router.get("/aa", (req, res)=>{
    console.log("Inside Test method");
    let admin = req.session;
    console.log(admin.user);
    if(admin.user){
        const filePath = path.join(__dirname, '../public/subjects/aa_ops.html') ;
        res.sendFile(filePath);

    } else{
        const filePath = path.join(__dirname, '../public/index.html') ;
        res.sendFile(filePath);
    }
});
router.get("/wdl", (req, res)=>{
    console.log("Inside Test method");
    let admin = req.session;
    console.log(admin.user);
    if(admin.user){
        const filePath = path.join(__dirname, '../public/subjects/wdl_ops.html') ;
        res.sendFile(filePath);

    } else{
        const filePath = path.join(__dirname, '../public/index.html') ;
        res.sendFile(filePath);
    }
});

module.exports = router;
