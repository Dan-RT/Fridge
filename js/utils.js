// various lists, constants etc. that need to be globally accessible

export var foodCategories = {
  "can":"Cannages",
  "riz":"Riz",
  "lait":"Lait",
  "tomates":"Tomate",
  "pate" :"Pâtes",
};

export var typeDish = {
  "entree":"Entrée",
  "plats":"Plats",
  "dessert":"Dessert",
};

export var typeMeal = {
  "breakfast":"Breakfast",
  "lunch":"Lunch",
  "dinner":"Dinner",
};


//https://ancient-bear-42.localtunnel.me/fridge/add/barCode/123/quantity/123/token/123
export var fridgeServerURL = "https://ancient-bear-42.localtunnel.me";    //the private API with your personnal fridge
export var scanServerURL = "https://quiet-chipmunk-43.localtunnel.me";      //the public API with general resources
export var endpointBcodeCheck = "/scan/search/barCode/";
export var addIngredientFrigo = "/fridge/ingredient/add/token/";
export var subIngredientFrigo = "/fridge/sub/barCode/";
export var quantityEndPoint = "/quantity/";
export var tokenEndPoint = "/token/";
export var createIngredientEnpoint = "/scan/add/"
export var dumToken = "1608105215";

export var portFoodAPI = 8002;
export var portScanAPI = 8001;
export var token = 4411269;
