const API_TOKEN = "AIzaSyBNeMD91ymR2CMj0R9xBPMrr1XkRQ1-A5c"

export function getSupermarket (latitude, longitude, radius, type){
  console.log("REQUEST LAUNCHED : GET Supermarket");
  const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=" + radius +
              "&type=" + type + "&key=" + API_TOKEN

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
