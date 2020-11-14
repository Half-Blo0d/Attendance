const mongoose = require('mongoose');

const attendances = mongoose.Schema({
    name: {type: String, required: true},
    time: {type: String, required: true},
    roster: {type: String, required: true},
    subject: {type: String, required: true},
    id: {type: Number, required: true},
});

module.exports = mongoose.model('attendances', attendances);
