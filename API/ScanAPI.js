import { portScanAPI } from '../js/utils'

export function getIngredient(barcode){
  const url = "http://localhost:" + portScanAPI + "/scan/search/barCode/" + barcode
  console.log("getIngredient" + url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}

export function postAddIngredientScan(ingredient){
  const url = "http://localhost:" + portScanAPI + "/scan/add/"

  console.log("postAddIngredientScan " + url);

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

export function getDeleteIngredient(barcode){
  const url = "http://localhost:" + portScanAPI + "/scan/delete/barCode/" + barcode

  console.log("getDeleteIngredient ", url);

  return fetch(url).then(function(response){
    return response.json();
  }).catch(function(error) {
    throw error;
  });
}
