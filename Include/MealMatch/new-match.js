let latitudeInput, longitudeInput;
let radiusInput;
let numResultsInput;

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

function getCurrentLocation(callback) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    }
    else {
        console.log("Geolocation error");
    }
}
function setLocation() {
    getCurrentLocation((position) => {
        latitudeInput.value = position.coords.latitude;
        longitudeInput.value = position.coords.longitude;
    });
}

function setClick(id, callback) {
    document.getElementById(id)
        .addEventListener("click", callback);
}
document.addEventListener("DOMContentLoaded", () => {
    latitudeInput = document.getElementById("latitude");
    longitudeInput = document.getElementById("longitude");
    radiusInput = document.getElementById("radius");
    numResultsInput = document.getElementById("numresults");
    setClick("mylocation", setLocation);
});

export { parseLocation, parseRadius, parseNumResults }