const express = require('express');
const router = express.Router();
var database = require('../public/javascripts/database');
const Ingredient = require('../public/javascripts/models/ingredient.js');
const Recipe = require('../public/javascripts/models/recipe.js');

const RecipeModel = require('../public/javascripts/mongoose/RecipeSchema');
const IngredientModel = require('../public/javascripts/mongoose/IngredientSchema');


const listIngredients = [];
listIngredients.push(new Ingredient("Tomato Sauce", "plat", "lunch", "100", 1, ["tomato", "sauce", "bolognaise", "provençale"]));
listIngredients.push(new Ingredient("Pesto Sauce", "plat", "lunch", "100", 1, ["sauce", "pesto"]));
listIngredients.push(new Ingredient("Pasta", "plat", "lunch", "100", 1, ["pasta", "pates", "pâtes", "spaghetti", "torti"]));


router.get('/search/keyword/:keyword', function (req, res) {
    console.log("GET Request : keyword: " + req.params.keyword);

    var keyword_ = req.params.keyword;

    IngredientModel.find({
        keywords: keyword_
    }).then(doc => {
        console.log("\nDOCUMENT FOUND");
        console.log(doc);
        console.log("\n");
        res.send(doc);
    }).catch(err => {
        console.error(err);
        res.send("{}");
    });
});


router.get('/search/id/:id', function (req, res) {
    console.log("GET Request : keyword: " + req.params.id);

    var id = req.params.id;

    IngredientModel.find({
        _id: id
    }).then(doc => {
        console.log("\nDOCUMENT FOUND");
        console.log(doc);
        console.log("\n");
        res.send(doc);
    }).catch(err => {
        console.error(err);
        res.send("{}");
    });
});


router.post('/add', function(req, res) {
    /*var result = JSON.stringify(req.body);

    console.log("\nPOST request: ");
    console.log(result);

    let ingredientToAdd = new IngredientModel({
        name: listIngredients[2].name,
        typeDish: listIngredients[2].typeDish,
        typeMeal: listIngredients[2].typeMeal,
        weight: listIngredients[2].weight,
        quantity: listIngredients[2].quantity,
        keywords: listIngredients[2].keywords
    });

    ingredientToAdd.save()
        .then(doc => {
            console.log("\nINSERTION SUCCESSED");
            console.log(doc);
            console.log("\n");
            res.send("{}");
        }).catch(err => {
        console.error(err);
        res.send("{}");
    });*/
    res.send("200");
});


router.get('/delete/:id', function(req, res) {

    IngredientModel
        .findOneAndRemove({
            _id: req.params.id
        }).then(response => {
        console.log("\nDOCUMENT DELETED");
        console.log("\n");
        res.send(response);
    }).catch(err => {
        console.error(err);
        res.send("{}");
    });

});


router.post('/modify/', function(req, res) {

    console.log("\nPOST request: ");
    console.log(result);

    IngredientModel
        .findOneAndUpdate(
            {
                _id: req.body._id                // search query
            },
            {
                name: req.body.name,             // field:values to update
                typeDish: req.body.typeDish,
                typeMeal: req.body.typeMeal,
                weight: req.body.weight,
                quantity: req.body.quantity,
                keywords: req.body.keywords
            },
            {
                new: true,                       // return updated doc
                runValidators: true              // validate before update
            })
        .then(doc => {
            console.log(doc);
            res.send(doc);
        })
        .catch(err => {
            console.error(err);
            res.send("{}");
        });
});






module.exports = router;