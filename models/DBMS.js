const mongoose = require('mongoose');

const DBMS = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
});

module.exports = mongoose.model('DBMS', DBMS);
