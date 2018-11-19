let mongoose = require('mongoose');

let userSchema  = new mongoose.Schema({
    name: String,
    token: Number,
    ingredients: Array
});

module.exports = mongoose.model('User', userSchema);