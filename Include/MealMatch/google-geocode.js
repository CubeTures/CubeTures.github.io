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
        else {
            alert("Reverse geocode error");
        }
    }
    else {
        alert("locaiton service error");
    }

    return null;
}
function getGeolocation() {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(position => resolve(position));
    });
}

async function reverseGeocode(latlng) {
    const parameters = { 
        "latlng": latlng, 
        "location_type": "ROOFTOP",
        "key": API_KEY 
    };
    const data = await httpRequest(REVERSE_GEOCODE_URL, parameters);
    console.log(data);
    if(data && data["status"] == "OK") {
        return getAddressData(data["results"][0]);
    }

    return null;
}
function getAddressData(data) {
    let addressData = {};

    for(const [index, component] of Object.entries(data["address_components"])) {
        const dataType = component["types"][0];
        const name = component["short_name"];
        addressData[dataType] = name;
    }

    return addressData;
}

// [street_number] [route], [locality], [administrative_area_level_1] [postal_code], USA


//geocode
//get location

//return all results as {address, latlng}


export { getCurrentLocation };