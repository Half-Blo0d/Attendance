const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const StudentRegistration = require('../models/studentregistration');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
    console.log('Connection Error');
});

router.get('/studentRegistrationManagement', (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/student_registration_ops.html'))
});

router.get('/get-studentRegistration',(req,res)=>{
    StudentRegistration.find().then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/add-studentRegistration',(req,res)=>{
    const studentRegistration = new StudentRegistration({
        name: req.body.name,
        roll_no: req.body.roll_no,
        phone_no: req.body.phone_no,
        email: req.body.email,
        password: req.body.password,

    });
    studentRegistration.save().then((result)=>{
        res.json({
            'info':'Record added',
            'obj': result
        });
    });
});

module.exports = router;
