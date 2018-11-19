let mongoose = require('mongoose');

let groceriesSchema  = new mongoose.Schema({
    tokenUser: Number,
    ingredients: Array
});

module.exports = mongoose.model('Groceries', groceriesSchema);

