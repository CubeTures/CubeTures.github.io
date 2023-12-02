let latitudeInput, longitudeInput;
let radiusInput;
let numResultsInput;

function onDocumentLoad() {
    setVariables();
    setOnClicks();
}
function setVariables() {
    latitudeInput = document.getElementById("latitude");
    longitudeInput = document.getElementById("longitude");
    radiusInput = document.getElementById("radius");
    numResultsInput = document.getElementById("numresults");
}
function setOnClicks() {
    document.getElementById("mylocation")
        .addEventListener("click", setLocation);
}

function setLocation() {
    getCurrentLocation((position) => {
        latitudeInput.value = position.coords.latitude;
        longitudeInput.value = position.coords.longitude;
    });
}
function getCurrentLocation(callback) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    }
    else {
        console.log("Geolocation error");
    }
}

function parseInputData() {
    checkForData();
    let inputData = {}
    inputData["ll"] = parseLocation();
    inputData["radius"] = parseRadius();
    inputData["limit"] = parseNumResults();

    return inputData;
}
function parseLocation() {
    return `${latitudeInput.value},${longitudeInput.value}`
}
function milesToMeters(miles) {
    return parseInt(miles) * 1609;
}
function parseRadius() {
    return String(milesToMeters(radiusInput.value));
}
function parseNumResults() {
    return numResultsInput.value;
}

function checkForData() {
    //check to see if all the data is filled, otherwise give errors using bootstrap
}


document.addEventListener("DOMContentLoaded", onDocumentLoad);
export { parseInputData }