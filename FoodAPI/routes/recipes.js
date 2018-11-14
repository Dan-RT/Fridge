const express = require('express');
const router = express.Router();
var database = require('../public/javascripts/database');
const ingredient = require('../public/javascripts/models/ingredient.js');
const recipe = require('../public/javascripts/models/recipe.js');

const RecipeModel = require('../public/javascripts/mongoose/RecipeSchema');

const listIngredients = [];

listIngredients.push(new ingredient("Tomato Sauce", "plat", "lunch", "100", 1, ["tomato", "sauce", "bolognaise", "provençale"]));
listIngredients.push(new ingredient("Pesto Sauce", "plat", "lunch", "100", 1, ["sauce", "pesto"]));
listIngredients.push(new ingredient("Pasta", "plat", "lunch", "100", 1, ["pasta", "pates", "pâtes", "spaghetti", "torti"]));


const listRecipes = [];

listRecipes.push(new recipe("Pâtes Bolo",
								[
									listIngredients[0],
									listIngredients[2]
								], [], "test description"
							)
				);

listRecipes.push(new recipe("Pâtes Pesto",
								[
									listIngredients[1],
									listIngredients[2]
								], [], "test description"
							)
				);
listRecipes.push(new recipe("Soupe de tomate",
								[
									listIngredients[0]
								], ["soupe", "soup"],  "test description"
							)
);


router.get('/search/:keyword', function (req, res) {
 	console.log("GET Request : keyword: " + req.params.keyword);

 	var keyword_ = req.params.keyword;

    RecipeModel.find({
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

router.get('/recipe/id/:id_recipe', function (req, res) {

    listRecipes.forEach(function(item) {
    	if (item.id === req.params.id_recipe) {
    		res.send(item)
		}
	});
  	res.send("{}");
});


router.post('/add', function(req, res) {
    var result = JSON.stringify(req.body);

    console.log("\nPOST request: ");
    console.log(result);

    let recipeToAdd = new RecipeModel({
        name: listRecipes[2].name,
        ingredients: listRecipes[2].ingredients,
        keywords: listRecipes[2].keywords,
        description: listRecipes[2].description
    });

    recipeToAdd.save()
        .then(doc => {
            console.log("\nINSERTION SUCCESSED");
            console.log(doc);
            console.log("\n");
            res.send("{}");
        }).catch(err => {
            console.error(err);
            res.send("{}");
        });

});

router.get('/delete', function(req, res) {

    RecipeModel
        .findOneAndRemove({
            keywords: 'pates'
        }).then(response => {
            console.log("\nDOCUMENT DELETED");
            console.log("\n");
            res.send(response);
        }).catch(err => {
            console.error(err)
            res.send("{}");
        });

});


module.exports = router;




