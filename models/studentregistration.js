const mongoose = require('mongoose');

const StudentRegistration = mongoose.Schema({
    name: {type: String, required: true},
    roll_no: {type: String, required: true},
    phone_no: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('StudentRegistration', StudentRegistration);
