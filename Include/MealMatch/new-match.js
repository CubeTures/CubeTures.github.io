import { getUserData } from "./firebase-database.js"
let addressInput, latitudeInput, longitudeInput;
let radiusInput;
let peopleContainer, peopleTemplate, peopleDisclaimer;

function onDocumentLoad() {
    setLocation();
    setRadius();
    setPeople();
    setMatch();
}

function setLocation() {
    addressInput = document.getElementById("address-input");
    latitudeInput = document.getElementById("latitude-input");
    longitudeInput = document.getElementById("longitude-input");

    setOnClick("current-location", setCurrentLocation);
}
function setCurrentLocation() {
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

function setRadius() {
    radiusInput = document.getElementById("radius-input");
    //set radius min and max
    //set miles-btn and meters-btn
    //set info button
}

function setPeople() {
    peopleContainer = document.getElementById("people-container");
    peopleTemplate = document.getElementById("people-template");
    peopleDisclaimer = document.getElementById("people-disclaimer");
    populatePeople();
    //set info button
}
async function populatePeople() {
    const friends = await getUserData("writeonly/friends");

    if(friends) {
        peopleDisclaimer.classList.add("hidden");
        for(const [uid, displayName] of Object.entries(friends)) {
            addPerson(uid, displayName);
        }
    }
}
function addPerson(uid, displayName) {
    const clone = peopleTemplate.content.cloneNode(true);
    
    const input = clone.querySelector("#input");
    input.classList.add("people-element");
    input.setAttribute("id", uid);
    input.setAttribute("displayName", displayName);

    const label = clone.querySelector("#label");
    label.textContent = displayName;
    label.setAttribute("for", uid);

    peopleContainer.append(clone);
}

function setMatch() {
    setOnClick("test-location", () => { 
        const data = JSON.stringify(tryGetLocation(), null, 2);
        console.log(`Location:\n${data}`);
    });
    setOnClick("test-radius", () => {
        const data = JSON.stringify(tryGetRadius(), null, 2);
        console.log(`Radius:\n${data}`);
    });
    setOnClick("test-people", () => { 
        const data = JSON.stringify(tryGetPeople(), null, 2);
        console.log(`People:\n${data}`);
    });

    setOnClick("match", tryMatch);
}
function tryMatch() {
    const inputData = tryGetInputs();
    if(inputData) {
        /*  
            get all of the data into an object
            send object to different class
            class calls api and gets data
            if api call returned results
                class stores data in database
                also updates users in the list with match request
            else
                prompt the user to change their location or radius of search  
        */ 
    }
}

function tryGetInputs() {
    //get all the data
    //prompt the user if the input is invalid
    const ll = tryGetLocation();
    if(!ll) { return null; }

    const radius = tryGetRadius();
    if(!radius) { return null; }

    const people = tryGetPeople();
    if(!people) { return null; }

    return {
        "ll": ll,
        "radius": radius,
        "people": people
    };
}
function tryGetLocation() {
    //get address and see if it is a valid location
    //or
    //get latitude and longitute and check if valid locaiton

    //prompt an error if either are incorrect
    return null;
}
function tryGetRadius() {
    //round to int
    //just forcibly clamp the bounds if they are somehow invalid
    //if the input is just null, do minimum
    return null;
}
function tryGetPeople() {
    let people = {};
    let isEmpty = true;

    const inputs = document.getElementsByClassName("people-element");
    for(let i = 0; i < inputs.length; i++) {
        const input = inputs.item(i);
        if(input.checked) {
            people[input.getAttribute("id")] = input.getAttribute("displayName");
            isEmpty = false;
        }
    }

    if(isEmpty) {
        //prompt error and tell user how to fix
        console.log("ERROR: No people selected.");
        return null;
    }
    return people;
}

function setOnClick(elementID, callback) {
    document.getElementById(elementID)
        .addEventListener("click", callback);
}


document.addEventListener("DOMContentLoaded", onDocumentLoad);