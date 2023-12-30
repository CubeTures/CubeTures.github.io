import { postRequest } from "../api-commands.js";
import { NEARBY_SEARCH_URL, getNearbyHeader, getNearbyBody } from "./google-api.js";

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

async function createNewMatch(inputData, matchErrorCallback) {
    //const data = await postRequest(NEARBY_SEARCH_URL, header, getBody(loc["latlng"]));

    const latlng = "29.6993022,-95.8161011";
    const body = getNearbyBody(latlng);
    const data = await postRequest(NEARBY_SEARCH_URL, getNearbyHeader(), body);
    console.log(data);

    //alertInputData(inputData);
}
function alertInputData(inputData) {
    const loc = inputData["locationData"];
    const formattedAddress = `${loc["address"]}, ${loc["city"]}, ${loc["state"]} ${loc["zip"]}`;
    const latlng = loc["latlng"].split(",").join(", ");
    alert(`${formattedAddress} @ ${latlng}`);
}

document.addEventListener("DOMContentLoaded", () => {
    //createNewMatch();
});

/*
    const R = 3958.8; // miles
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in miles
*/


export { createNewMatch };