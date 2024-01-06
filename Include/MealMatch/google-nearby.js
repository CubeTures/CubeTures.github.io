import { httpRequest, postRequest, getRequest } from "../api-commands.js";
import { NEARBY_SEARCH_URL, getNearbyHeader, getNearbyBody,
    getPhotoUrl } from "./google-api.js";
const EARTH_RADIUS = 3958.8, getPhotos = false;
//TODO: find out when if better parameters for maxWidthPx and maxHeightPx

async function createNewMatch(inputData, matchErrorCallback) {
    console.log(inputData);

    try {
        const body = getNearbyBody(inputData["locationData"]["latlng"]);
        const locations = await postRequest(NEARBY_SEARCH_URL, getNearbyHeader(), body);
        console.log(locations);
        return await getMatchData(inputData, locations);
    }  
    catch(error) {
        matchErrorCallback(error);
    }    

    return null;
}

async function getMatchData(inputData, locations) {
    let result = getBasicMatchData(inputData);
    result["locations"] = await getLocationData(inputData, locations);
    return result;
}
function getBasicMatchData(inputData) {
    let result = {};
    const location = inputData["locationData"];
    const date = new Date();

    result["address"] = `${location["address"]}, ${location["city"]}, ${location["state"]} ${location["zip"]}`;
    result["date"] = date.toLocaleDateString();
    result["time"] = date.toLocaleTimeString();
    result["people"] = inputData["people"];

    return result;
}
async function getLocationData(inputData, locations) {
    let result = {};
    const latlng = inputData["locationData"]["latlng"];
    const people = inputData["people"];

    for(const location of locations["places"]) {
        const id = location["id"];
        let loc = getBasicLocationData(location);
        loc["distance"] = getDistanceData(location, latlng);
        loc["hours"] = getHourData(location);
        loc["responses"] = getResponseData(people);
        loc["photos"] = await getPhotoData(inputData, location, id);
        result[id] = loc;
    }

    return result;
}
function getBasicLocationData(location) {
    return {
        "name": location["displayName"]["text"],
        "category": location["primaryTypeDisplayName"]["text"],
        "price": location["priceLevel"],

        "rating": location["rating"],
        "website": location["websiteUri"],
        "phone": location["nationalPhoneNumber"],
        "address": location["formattedAddress"],
        "maps": location["googleMapsUri"],
        "status": location["businessStatus"]
    };
}
function getDistanceData(location, fromlatlng) {
    const tolatlng = `${location["location"]["latitude"]},${location["location"]['longitude']}`;
    return latlngDistance(fromlatlng, tolatlng);
}
async function getPhotoData(inputData, location, id) {
    let photos = {};
    let count = 0;

    if(getPhotos) {
        const { width, height } = inputData;
        for(const photo of location["photos"]) {
            if(++count > 5) { break; }
            const name = photo["name"];
            const response = await httpRequest(getPhotoUrl(name, width, height), null, true);
            const data = await httpRequest(url);
            console.log(data);
            break;

            //photos[response["url"]] = true;
        }
    }    

    return photos;
}
function getHourData(location) {
    const hours = location["currentOpeningHours"]["weekdayDescriptions"];
    return hours.join(",");
}
function getResponseData(people) {
    let result = {};
    for(const id in people) {
        result[id] = "U";
    }

    return result;
}

function latlngDistance(fromlatlng, tolatlng) {
    const [ flat, flng ] = latlngFloat(fromlatlng);
    const [ tlat, tlng ] = latlngFloat(tolatlng);

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


export { createNewMatch };