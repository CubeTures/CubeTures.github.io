//#region data
import { API_KEY } from "./initialize-firebase.js";

const masks = {
    "basic": {
        "places.id": true,
        "places.displayName": true,
        "places.primaryTypeDisplayName": true,
        "places.types": true,
        "places.photos": true
    },
    "all": {
        "places.displayName": true,
        "places.googleMapsUri": true,
        "places.websiteUri": true,
        "places.formattedAddress": true,
        "places.businessStatus": true,
        "places.id": true,
        "places.location": true,
        "places.photos": true,
        "places.primaryTypeDisplayName": true,
        "places.currentOpeningHours": true,
        "places.nationalPhoneNumber": true,
        "places.priceLevel": true,
        "places.rating": true
    }
};

const filters = {
    "other": {
        "bakery": true,
        "bar": true,
        "cafe": true,
        "coffee_shop": true,
        "ice_cream_shop": true,
        "meal_delivery": true,
        "sandwich_shop": true,
        "steak_house": true
    },
    "food type": {
        "breakfast_restaurant": true,
        "brunch_restaurant": true,
        "fast_food_restaurant": true,
        "hamburger_restaurant": true,
        "pizza_restaurant": true,
        "ramen_restaurant": true,
        "seafood_restaurant": true,
        "vegan_restaurant": true,
        "vegetarian_restaurant": true
    },
    "culture": {
        "american_restaurant": true,
        "barbecue_restaurant": true,
        "brazilian_restaurant": true,
        "chinese_restaurant": true,
        "french_restaurant": true,
        "greek_restaurant": true,
        "indian_restaurant": true,
        "indonesian_restaurant": true,
        "italian_restaurant": true,
        "japanese_restaurant": true,
        "korean_restaurant": true,
        "lebanese_restaurant": true,
        "mediterranean_restaurant": true,
        "mexican_restaurant": true,
        "middle_eastern_restaurant": true,
        "spanish_restaurant": true,
        "sushi_restaurant": true,
        "thai_restaurant": true,
        "turkish_restaurant": true,
        "vietnamese_restaurant": true
    }
};
//#endregion
//#region helpers
function asString(obj) {
    let result = "";
    for(const o in obj) {
        result += (result == "") ? o : `,${o}`;
    }

    return result;
}
function asArray(obj) {
    let result = [];
    for(const o in obj) {
        result.push(o);
    }

    return result;
}

function getAllFilters() {
    let result = [];
    for(const filterCategory in filters) {
        for(const filter in filters[filterCategory]) {
            result.push(filter);
        }
    }

    return result;
}
function getReadableFilters() {
    let result = {};
    for(const filterCategory in filters) {
        for(const filter in filterCategory) {
            const name = `${filter.substring(0, 1).toUpperCase()}${filter.substring(1).replace("_", " ")}`;
            result[name ]
        }
    }

    return result;
}
//#endregion
//#region login
const REFRESH_TOKEN_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

const refreshHeader = {
    "Content-Type": "application/json"
}

function getRefreshParameters(refreshToken) {
    return {
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    };
}
//#endregion
//#region geocode
const REVERSE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const geolocationOptions = {
    maximumAge: 10000,
    timeout: 5000,
    enableHighAccuracy: true
};

function getGeocodeParameters(latlng) {
    return { 
        "latlng": latlng, 
        "location_type": "ROOFTOP",
        "key": API_KEY 
    };
}
//#endregion
//#region validation
const ADDRESS_VALIDATION_URL = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${API_KEY}`;

const validationHeader = {
    "Content-Type": "application/json"
};

function getValidationBody(address, city, state, zip) {
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
//#endregion
//#region nearby
const NEARBY_SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";
const basicMasks = asString(masks["basic"]), allMasks = asString(masks["all"]);
const allFilters = getAllFilters();
const readableFilters = getReadableFilters();

function getNearbyHeader(useAllMasks=true) {
    return {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': useAllMasks ? allMasks : basicMasks
    };
}

//simple: gets popular in 7.5 mile radius
function getNearbyBody(latlng, types=allFilters) {
    const [ lat, lng ] = latlng.split(",");

    return {
        includedPrimaryTypes: types,
        includedTypes: ["restaurant"],
        maxResultCount: 20,
        rankPreference: "POPULARITY",
        locationRestriction: {
            circle: {
                center: {
                    latitude: lat,
                    longitude: lng
                },
                radius: 12000
            }
        }
    }
}
//#endregion
//#region photos
function getPhotoUrl(name, maxWidth, maxHeight) {
    if(maxHeight) {
        return `https://places.googleapis.com/v1/${name}/media?maxHeightPx=${maxHeight}&maxWidthPx=${maxWidth}&key=${API_KEY}`;
    }

    return `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
}
//#endregion

document.addEventListener("DOMContentLoaded", () => {
    // const split = basicMask.split(",");
    // const join = split.join("\": true,\n\"");
    // console.log(`{\n"${join}": true\n}`);
});

export { 
    REFRESH_TOKEN_URL, refreshHeader, getRefreshParameters,
    REVERSE_GEOCODE_URL, geolocationOptions, getGeocodeParameters,
    ADDRESS_VALIDATION_URL, validationHeader, getValidationBody,
    NEARBY_SEARCH_URL, readableFilters, getNearbyHeader, getNearbyBody,
    getPhotoUrl
};