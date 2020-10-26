const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser');

const StudentRegistration = require('../models/studentregistration');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
  console.log('Connection Error');
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/login", (req, res)=>{
  console.log(req.body.user);
  console.log(req.body.pass);
  const data = {
    msg: "",
    info: ""
  }
  if(req.body.user == "admin" && req.body.pass=="admin") {
    data.msg = "Login Successful";
    data.info = 'admin'

    let sess = req.session;
    sess.user = req.body.user;
    sess.pass = req.body.pass;
    req.session.save();
  } else{
    data.msg = "Login failure";
  }
  res.json(data);
});

router.get("/test", (req, res)=>{
  console.log("Inside Test method");
  let sess = req.session;
  console.log(sess.user);
  if(sess.user){
    const filePath = path.join(__dirname, '../public/test.html') ;
    res.sendFile(filePath);
  } else{
    const filePath = path.join(__dirname, '../public/index.html') ;
    res.sendFile(filePath);
  }

});




module.exports = router;
