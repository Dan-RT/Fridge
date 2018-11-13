const express = require('express');
const router = express.Router();

const ingredient = require('../public/javascripts/models/ingredient.js');
const recipe = require('../public/javascripts/models/recipe.js');


const listIngredients = [];

listIngredients.push(new ingredient("Tomato Sauce", "plat", "lunch", "100", 1, ["tomato", "sauce", "bolognaise", "provençale"]));
listIngredients.push(new ingredient("Pesto Sauce", "plat", "lunch", "100", 1, ["sauce", "pesto"]));
listIngredients.push(new ingredient("Pasta", "plat", "lunch", "100", 1, ["pasta", "pates", "pâtes", "spaghetti", "torti"]));


const listRecipes = [];

listRecipes.push(new recipe(0, "Pâtes Bolo",
								[
									listIngredients[0],
									listIngredients[2]
								], [], "test description"
							)
				);
listRecipes.push(new recipe(1, "Pâtes Pesto",
								[
									listIngredients[1],
									listIngredients[2]
								], [], "test description"
							)
				);
listRecipes.push(new recipe(2, "Soupe de tomate",
								[
									listIngredients[0]
								], ["soupe", "soup"],  "test description"
							)
);

//const gen = require('../generateur');

/* GET parties listing. */
router.get('/', function (req, res, next) {
  res.send(listRecipes);
});

router.get('/search/:keyword', function (req, res) {
 	console.log("GET Request : keyword: " + req.params.keyword);

 	var keyword_ = req.params.keyword;
	let data = [];

	listRecipes.forEach(function(item) {
		if (item.matchKeyword(keyword_)) {
			data.push(item);
		}
	});

	console.log("\nData sent :")
	console.log(data);

  	res.send(data);
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

	res.send("{}");
});

module.exports = router;




