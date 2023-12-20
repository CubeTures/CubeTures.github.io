import { postRequest } from "../api-commands.js";
import { API_KEY } from "./initialize-firebase.js";
const NEARBY_SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";

const header = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': "places.id,places.displayName,places.photos,places.rating,places.priceLevel"
};
const body = {
    includedTypes: ["restaurant"],
    maxResultCount: 10,
    locationRestriction: {
        circle: {
            center: {
                latitude: 37.7937,
                longitude: -122.3965
            },
            radius: 500.0
        }
    }
};

async function createRequest() {
    const data = await postRequest(NEARBY_SEARCH_URL, header, body);
    console.log(data);
}

document.addEventListener("DOMContentLoaded", () => {
    //createRequest();
});
