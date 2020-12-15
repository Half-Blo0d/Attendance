const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


const attendances = require('../../models/attendances.js');
const db = require('../../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
    console.log('Connection Error');
});
router.post('/search',(req,res)=>{
    attendances.find({"time.string_date": req.body.date, subject: "WDL"}).then((response)=>{
        console.log()

        res.json(response);
    }).catch((err)=>{
        console.log(err);
    });
});
module.exports = router;
