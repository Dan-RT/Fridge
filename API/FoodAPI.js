export function getRecipesFromApiWithSearchedText (food) {
  const url = 'http://10.0.2.2:3000/recipes/search/' + food

  console.log("getRecipesFromApiWithSearchedText API call to : " + url);

  return fetch(url).then((response) => response.text())
   .then((responseText) => {
       console.log(JSON.parse(responseText));
       return JSON.parse(responseText);
   })
   .catch((error) => {
       console.log("reset client error-------",error);
  });
}

export function getRecipesFromApibyId (id) {
  const url = 'http://10.0.2.2:3000/recipes/recipe/id/' + id

  console.log("getRecipesFromApibyId API call to : " + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function addNewIngredient() {
  const url = 'http://10.0.2.2:3000/recipes/add'

  console.log("addNewIngredient API call to : " + url);

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