export function getRecipesFromApiWithSearchedText (food) {
  const url = 'http://10.0.2.2:3000/recipes/search/keyword/' + food

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

export function getRecipesFromApibyId (id) {
  const url = 'http://10.0.2.2:3000/recipes/search/id/' + id

  console.log("getRecipesFromApibyId API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function postNewRecipe() {
  const url = 'http://10.0.2.2:3000/recipes/add'

  console.log("_postNewRecipe API call to : " + url);

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
    }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });

}


export function deleteRecipeByID(id) {
  //pas encore utilisée
  const url = 'http://10.0.2.2:3000/recipes/delete/id/' + id

  console.log("deleteRecipeByID API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function getDeleteRecipe() {
  //à delete
  const url = 'http://10.0.2.2:3000/recipes/delete'

  console.log("_postDeleteRecipe API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}
