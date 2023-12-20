import { httpRequest, postRequest } from "../api-commands.js";
import { API_KEY } from "./initialize-firebase.js";
const REVERSE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const ADDRESS_VALIDATION_URL = "https://addressvalidation.googleapis.com/v1:validateAddress"
const header = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY
}

async function getCurrentLocation() {
    const position = await getGeolocation();
    if(position) {
        const latlng = `${position.coords.latitude},${position.coords.longitude}`; 
        const address = await reverseGeocode(latlng);

        if(address) {
            return {
                "address": address,
                "latlng": latlng
            }
        }
    }

    //error in getting location
    return null;
}
function getGeolocation() {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(position => resolve(position));
    });
}

async function reverseGeocode(latlng) {
    const parameters = { "latlng": latlng, "key": API_KEY };
    const data = await httpRequest(REVERSE_GEOCODE_URL, parameters);
    if(data["results"]) {
        return data["results"][0]["formatted_address"];
    }

    return null;
}


//geocode
//get location

//return all results as {address, latlng}


export { getCurrentLocation };