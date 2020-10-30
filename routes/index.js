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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req,res)=> {
  console.log(req.body.user);
  console.log(req.body.pass);
  const data = {
    msg: "",
    info: ""
  }
  StudentRegistration.findOne({email: req.body.user, password: req.body.pass}, function (err, user) {
    console.log('User found');
    if (err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err)

    }
    if (user && user.pass === req.body.password) {
      console.log('User and password is correct');
      data.msg = "Login Successful";
      data.info = 'admin';
      res.json(data);


      let sess = req.session;
      sess.user = req.body.user;
      sess.pass = req.body.pass;
      req.session.save();

    }
    else if(req.body.user === 'admin@root' && req.body.pass === 'admin'){
      console.log('Admin Login');
      data.msg = "Admin Login";
      data.info = 'admin';
      res.json(data);


      let admin = req.session;
      admin.user = req.body.user;
      admin.pass = req.body.pass;
      req.session.save();

    }else {
        console.log("Credentials wrong");
        data.msg = "Invalid Credentials";
        res.json(data);

    }

  });

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

router.get("/admin", (req, res)=>{
  console.log("Inside Test method");
  let admin = req.session;
  console.log(admin.user);
  if(admin.user){
    const filePath = path.join(__dirname, '../public/admin_ops.html') ;
    res.sendFile(filePath);

  } else{
    const filePath = path.join(__dirname, '../public/index.html') ;
    res.sendFile(filePath);
  }
});

router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });

});

module.exports = router;
