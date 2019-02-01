import { portFoodAPI } from '../js/utils'

export function getRecipesFromFridge (token) {
  const url = "http://localhost:" + portFoodAPI + "/fridge/recipes/fetchAll/token/" + token

  console.log("getRecipesFromApiWithSearchedText API call to : " + url);

  return fetch(url).then((response) => response.text())
   .then((responseText) => {
       console.log(responseText);
       return JSON.parse(responseText);
   })
   .catch((error) => {
       console.log("reset client error-------",error);
  });
}

export function getFridgeFromApi (token) {
  const url = "http://localhost:" + portFoodAPI + "/fridge/fetchAllFridge/token/" + token         //10.0.2.2

  console.log("getFridgeFromApi API call to : " + url);

  return fetch(url).then((response) => response.text())
   .then((responseText) => {
       console.log(responseText);
       return JSON.parse(responseText);
   })
   .catch((error) => {
       console.log("reset client error-------",error);
  });

}

export function postIngredientToApi (token) {
  const url = 'http://10.0.2.2:" + portFoodAPI + "/fridge/ingredient/add/token/' + token

  console.log("postIngredientToApi API call to : " + url);
  return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    }).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function getRecipesFromApibyId (id) {
  const url = 'http://10.0.2.2:" + portFoodAPI + "/recipes/search/id/' + id

  console.log("getRecipesFromApibyId API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function postNewRecipe(token, recipe) {
  const url = "http://localhost:" + portFoodAPI + "/fridge/recipes/add/token/" + token

  console.log("_postNewRecipe API call to : " + url);

  return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    }).then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });

}


export function deleteRecipeByID(id) {
  //pas encore utilisée
  const url = 'http://10.0.2.2:" + portFoodAPI + "/recipes/delete/id/' + id

  console.log("deleteRecipeByID API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function getDeleteRecipe() {
  //à delete
  const url = 'http://10.0.2.2:" + portFoodAPI + "/recipes/delete'

  console.log("_postDeleteRecipe API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function getDeleteIngredient(groceries, token, barcode) {
  const url = "http://localhost:" + portFoodAPI + "/fridge/ingredient/remove/barCode/" + barcode + "/groceries/" + groceries + "/token/" + token

  console.log("getDeleteIngredient " + url);

  return fetch(url).then(function(response){
    console.log(response);
    return;
  }).catch(function(error) {
    throw error;
  });
}

export function postAddIngredientFridge(token, ingredient) {
  const url = "http://localhost:" + portFoodAPI + "/fridge/ingredient/add/token/" + token

  console.log("postAddIngredientFridge " + url );

  return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredient),
    }).then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getGroceries(token){
  const url = "http://localhost:" + portFoodAPI + "/fridge/search/groceries/token/" + token

  console.log("getGroceries" + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function getDeleteGroceries(token, barcode){
  const url = "http://localhost:" + portFoodAPI + "/fridge/remove/groceries/barcode/" + barcode + "/token/" + token

  console.log("getDeleteGroceries" + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function getDeleteQuantityIngredient(token, barcode, quantity){
  const url = "http://localhost:" + portFoodAPI + "/fridge/sub/barCode/" + barcode + "/quantity/" + quantity + "/token/" + token

  console.log("getDeleteQuantityIngredient " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}
