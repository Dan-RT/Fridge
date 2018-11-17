let mongoose = require('mongoose')

let recipeSchema  = new mongoose.Schema({
    name: String,
    ingredients: Array,
    keywords: Array,
    description: String
});
//recipeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Recipe', recipeSchema);