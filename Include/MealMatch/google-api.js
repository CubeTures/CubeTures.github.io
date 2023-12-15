import { API_KEY } from "./initialize-firebase.js";
const apiUrl = "https://places.googleapis.com/v1/places:searchNearby";

const requestData = {
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

const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'places.displayName'
};

function createRequest() {
    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', JSON.stringify(data, null, 2));
            // Handle the response data as needed
    })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createRequest();
});
