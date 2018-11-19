const express = require('express');
const router = express.Router();
var database = require('../public/javascripts/database');
const Ingredient = require('../public/javascripts/models/ingredient.js');
const Recipe = require('../public/javascripts/models/recipe.js');

const RecipeModel = require('../public/javascripts/mongoose/RecipeSchema');
const IngredientModel = require('../public/javascripts/mongoose/IngredientSchema');
const UserModel = require('../public/javascripts/mongoose/UserSchema');
const UserIngredientsModel = require('../public/javascripts/mongoose/UserIngredientsSchema');


const listIngredients = [];
listIngredients.push(new Ingredient("Tomato Sauce", "plat", "lunch", "100", 1, ["tomato", "sauce", "bolognaise", "provençale"]));
listIngredients.push(new Ingredient("Pesto Sauce", "plat", "lunch", "100", 1, ["sauce", "pesto"]));
listIngredients.push(new Ingredient("Pasta", "plat", "lunch", "100", 1, ["pasta", "pates", "pâtes", "spaghetti", "torti"]));


userIngredientListDoesExist = function (token) {

};

insertIngredient = function (res, token) {
    let ingredientToAdd = new IngredientModel({
        name: listIngredients[0].name,
        typeDish: listIngredients[0].typeDish,
        typeMeal: listIngredients[0].typeMeal,
        weight: listIngredients[0].weight,
        quantity: listIngredients[0].quantity,
        keywords: listIngredients[0].keywords
    });

    ingredientToAdd.save()
        .then(doc => {
            console.log("\nINGREDIENT INSERTION SUCCESSED");
            console.log(doc);

            var id = doc.toObject()._id;
            insertToUserIngredientList(res, token, id);
        }).catch(err => {
        console.error(err);
        res.send("{error:true}");
    });
};

insertToUserIngredientList = function (token, idIngredientToAdd) {

    UserIngredientsModel.find({
        tokenUser: token
    }).then(doc => {

        if (!doc.length === 0) {
            //Si la liste existe

            console.log("\nLIST FOUND");
            console.log(doc);

            var list = doc[0].toObject();
            list.ingredients.push(idIngredientToAdd);

            UserIngredientsModel
                .findOneAndUpdate(
                    {
                        _id: list._id
                    },
                    {
                        ingredients: list.ingredients
                    },
                    {
                        new: true,
                        runValidators: true
                    })
                .then(doc => {
                    console.log(doc);
                    console.log("\nINGREDIENT LIST UPDATED");
                }).catch(err => {
                    console.error(err);
                });

        }
        else {
            //Sinon on crée la liste

            var ingredientTmp = [idIngredientToAdd];

            let UserIngredientListToAdd = new UserIngredientsModel({
                tokenUser: token,
                ingredients: ingredientTmp
            });

            UserIngredientListToAdd.save()
                .then(doc => {
                    console.log("\nINGREDIENT LIST CREATION SUCCESSED");
                    console.log(doc);
                    res.send(doc);
                }).catch(err => {
                console.error(err);
            });
        }
    }).catch(err => {
        console.error(err);
    });
};


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

router.post('/add/:token', function(req, res) {
    //var result = JSON.stringify(req.body);

    console.log("\nPOST request: ");
    var token = req.params.token;
    console.log("\ntoken: " + token);
    //console.log(result);

    UserModel.find({
        token: token
    }).then(doc => {
        //Si on a un token valid

        if (doc.length === 0) {
            throw Error('USER NOT AUTHORIZED');
        } else {
            console.log("\nUSER AUTHORIZED FOUND");
            console.log(doc);
            insertIngredient(res, token);
        }
    }).catch(err => {
        console.log("\nUSER NOT AUTHORIZED");
        //console.error(err);
        res.send("{notAuthorized:true}");
    });
});

router.get('/delete/id/:id', function(req, res) {

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


