let mongoose = require('mongoose');

let userIngredientSchema  = new mongoose.Schema({
    tokenUser: Number,
    ingredients: Array
});

module.exports = mongoose.model('Groceries', userIngredientSchema);

