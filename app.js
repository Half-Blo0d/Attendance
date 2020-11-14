const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const studentRegistrationRouter = require('./routes/student_registration_ops');
const studentUpdateRouter =require('./routes/student_update_ops');
const subjectRouter = require('./routes/subject_ops');
const adminRouter = require('./routes/admin_ops');
const dbmsRouter = require('./routes/subjects/dbms_ops');
const wdlRouter = require('./routes/subjects/wdl_ops');
const tcsRouter = require('./routes/subjects/tcs_ops');
const aaRouter = require('./routes/subjects/aa_ops');



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
app.use('/admin/student_update',studentUpdateRouter);
app.use('/admin',adminRouter);
app.use('/admin/subjects/',subjectRouter);
app.use('/admin/subjects/dbms',dbmsRouter);
app.use('/admin/subjects/wdl',wdlRouter);
app.use('/admin/subjects/tcs',tcsRouter);
app.use('/admin/subjects/aa',aaRouter);








module.exports = app;
