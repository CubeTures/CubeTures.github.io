import { httpRequest, httpRequestJson, postRequest } from "../api-commands.js";
import { NEARBY_SEARCH_URL, getNearbyHeader, getNearbyBody,
    getPhotoUrl } from "./google-api.js";
const EARTH_RADIUS = 3958.8, getPhotos = false;
//TODO: find out when if better parameters for maxWidthPx and maxHeightPx

async function createNewMatch(inputData, matchErrorCallback) {
    console.log(inputData);

    try {
        const body = getNearbyBody(inputData["locationData"]["latlng"], inputData["radius"]);
        const locations = await postRequest(NEARBY_SEARCH_URL, getNearbyHeader(), body);
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
        "name": getNested(location, "displayName", "text"),
        "category": getNested(location, "primaryTypeDisplayName", "text"),
        "price": getNested(location, "priceLevel"),

        "rating": getNested(location, "rating"),
        "website": getNested(location, "websiteUri"),
        "phone": getNested(location, "nationalPhoneNumber"),
        "address": getNested(location, "formattedAddress"),
        "maps": getNested(location, "googleMapsUri"),
        "status": getNested(location, "businessStatus")
    };
}
function getDistanceData(location, fromlatlng) {
    const lat = getNested(location, "location", "latitude");
    const lng = getNested(location, "location", "longitude");
    if(lat === null || lng === null) { return "Unknown"; }
    const tolatlng = `${lat},${lng}`;
    return latlngDistance(fromlatlng, tolatlng);
}
async function getPhotoData(inputData, location, id) {
    let photos = {};
    let count = 0;

    if(getPhotos) {
        const { width, height } = inputData;
        const phts = getNested(location, "photos");
        if(phts === null) { return photos; }

        //check for id if cached
        for(const photo of location["photos"]) {
            if(++count > 5) { break; }
            const name = photo["name"];
            const response = await httpRequestJson(getPhotoUrl(name, width, height));
            console.log(response);
            photos[response["url"]] = true;
            break;
        }
        //save results for id to cache
    }    

    return photos;
}
function getHourData(location) {
    const hours = getNested(location, "currentOpeningHours", "weekdayDescriptions");
    if(hours === null) { return ""; }
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

function getNested(obj, level,  ...rest) {
    if (obj === undefined) return null;
    if (rest.length == 0 && obj.hasOwnProperty(level)) return obj[level];
    return getNested(obj[level], ...rest);
}

export { createNewMatch };