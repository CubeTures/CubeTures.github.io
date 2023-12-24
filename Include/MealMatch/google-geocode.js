import { httpRequest, postRequest } from "../api-commands.js";
import { API_KEY } from "./initialize-firebase.js";
const REVERSE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const ADDRESS_VALIDATION_URL = "https://addressvalidation.googleapis.com/v1:validateAddress"
const header = {
    "Content-Type": "application/json"
};
const geolocationOptions = {
    maximumAge: 10000,
    timeout: 5000,
    enableHighAccuracy: true
};

async function getCurrentLocation(errorCallback) {
    const position = await getGeolocation(errorCallback);

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

    return null;
}
function getGeolocation(errorCallback) {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), error => errorCallback(error.code), geolocationOptions);
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

async function validateAddress(address, city, state, zip, errorCallback) {
    const url = `${ADDRESS_VALIDATION_URL}?key=${API_KEY}`;
    //const body = getBody(address, city, state, zip);
    const body = getBody("24502 Evangeline Springs Ln", "Katy", "TX", "");

    const data = await postRequest(url, header, body);
    console.log(data);

    //if not data["result"]["verdict"]["addressComplete"] then tell to redo
    //data["result"]["geocode"]["location"]["latitude"]
}
function getBody(address, city, state, zip) {
    return {
        "address": {
            "regionCode": "US",
            "locality": city,
            "administrativeArea": state,
            "postalCode": zip,
            "addressLines": [address]
        },
        "enableUspsCass": true
    };
}

// [street_number] [route], [locality], [administrative_area_level_1] [postal_code], USA
//return all results as {address, latlng}

export { getCurrentLocation, validateAddress };