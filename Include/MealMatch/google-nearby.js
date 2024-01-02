import { postRequest } from "../api-commands.js";
import { NEARBY_SEARCH_URL, getNearbyHeader, getNearbyBody } from "./google-api.js";
const EARTH_RADIUS = 3958.8;

function onContentLoad() {
    //createNewMatch();
}


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
}
function alertInputData(inputData) {
    const loc = inputData["locationData"];
    const formattedAddress = `${loc["address"]}, ${loc["city"]}, ${loc["state"]} ${loc["zip"]}`;
    const latlng = loc["latlng"].split(",").join(", ");
    alert(`${formattedAddress} @ ${latlng}`);
}

function latlngDistance(fromLatLng, toLatLng) {
    const [ flat, flng ] = latlngFloat(fromLatLng);
    const [ tlat, tlng ] = latlngFloat(toLatLng);

    const radFromLat = toRadians(flat);
    const radFromLng = toRadians(flng);
    const radToLat = toRadians(tlat);
    const radToLng = toRadians(tlng);

    return (
        2 * EARTH_RADIUS *
        Math.asin(
            Math.sqrt(
                Math.pow(Math.sin((radFromLat - radToLat) / 2), 2) +
                Math.cos(radFromLat) *
                Math.cos(radToLat) *
                Math.pow(Math.sin((radFromLng - radToLng) / 2), 2)
            )
        ) 
    );
}
function latlngFloat(latlng) {
    const split = latlng.split(",");
    return [ parseFloat(split[0]), parseFloat(split[1]) ];
}
function toRadians(angleDegrees) {
    return (angleDegrees * Math.PI) / 180.0;
}


document.addEventListener("DOMContentLoaded", onContentLoad);

export { createNewMatch };