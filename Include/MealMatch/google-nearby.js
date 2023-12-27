import { postRequest } from "../api-commands.js";
import { API_KEY } from "./initialize-firebase.js";
const NEARBY_SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";

const header = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': "places.id,places.displayName,places.photos,places.rating,places.priceLevel"
};

async function createNewMatch(inputData, matchErrorCallback) { //locaitonData, people
    /*  
        get all of the data into an object
        send object to different class
        class calls api and gets data
        if api call returned results
            class stores data in database
            also updates users in the list with match request
        else
            prompt the user to change their location or radius of search  
    */ 

    //find way to get to the promised 60 results max

    //const data = await postRequest(NEARBY_SEARCH_URL, header, getBody(loc["latlng"]));
    //console.log(data);

    const loc = inputData["locationData"];
    const formattedAddress = `${loc["address"]}, ${loc["city"]}, ${loc["state"]} ${loc["zip"]}`;
    const latlng = loc["latlng"].split(",").join(", ");
    alert(`${formattedAddress} @ ${latlng}`);
}
function getBody(latlng) {
    const [ lat, lng ] = latlng.split(",");
    return {
        includedTypes: ["restaurant"],
        maxResultCount: 20,
        locationRestriction: {
            circle: {
                center: {
                    latitude: lat,
                    longitude: lng
                },
                radius: 50000.0
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //createRequest();
});

export { createNewMatch };