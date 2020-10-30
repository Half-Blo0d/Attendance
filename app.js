const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const studentRegistrationRouter = require('./routes/student_registration_ops');
const studentUpdateRouter =require('./routes/student_update_ops');
const adminPageRouter = require('./routes/admin_ops')

const app = express();

app.use(session({
    secret: "XIE",
    saveUninitialized: true,
    resave: false}
    ));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student_registration', studentRegistrationRouter);
app.use('/student_update',studentUpdateRouter);



module.exports = app;
