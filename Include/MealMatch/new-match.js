let latitudeInput, longitudeInput;
let radiusInput;
let numResultsInput;
let peopleContainer, peopleTemplate;

function onDocumentLoad() {
    setVariables();
    setOnClicks();
    setPeople();
}
function setVariables() {
    latitudeInput = document.getElementById("latitude");
    longitudeInput = document.getElementById("longitude");
    radiusInput = document.getElementById("radius");
    numResultsInput = document.getElementById("numresults");

    peopleContainer = document.getElementById("people-container");
    peopleTemplate = document.getElementById("people-template");
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

function checkForData() {
    //check to see if all the data is filled, otherwise give errors using bootstrap
}

function setPeople() {
    //hide the disclaimer if there are people
}


document.addEventListener("DOMContentLoaded", onDocumentLoad);
export { parseInputData }