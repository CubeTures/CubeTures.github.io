import { getUserData } from "./firebase-database.js"
import { getCurrentLocation, validateAddress } from "./google-geocode.js";
let addressInput, cityInput, stateInput, zipInput, latlngInput, locationSpinner;
let peopleContainer, peopleTemplate, peopleDisclaimer, peopleSpinner;

function onDocumentLoad() {
    setLocation();
    setPeople();
    setMatch();
}

/*
    How do location ???

    Click to use current location
        disable verify button

    Click verify location
        Verify location (check if can geocode)
        If valid, mark box with green check
        Disable verify button

    If the box is edited after verification 
        undo verification
        enable verify button
*/  
function setLocation() {
    addressInput = document.getElementById("address-input");
    cityInput = document.getElementById("city-input");
    stateInput = document.getElementById("state-input");
    zipInput = document.getElementById("zip-input");
    latlngInput = document.getElementById("latlng-input");
    locationSpinner = document.getElementById("location-spinner");

    setOnClick("current-location", setCurrentLocation);
}
async function setCurrentLocation() {
    locationSpinner.classList.remove("hidden");
    const locationData = await getCurrentLocation();
    locationSpinner.classList.add("hidden");

    if(locationData["error"]) {
        //error message
    }
    else if(locationData) {
        const address = locationData["address"];
        addressInput.value = `${address["street_number"]} ${address["route"]}`;
        cityInput.value = address["locality"];
        stateInput.value = address["administrative_area_level_1"];
        zipInput.value = address["postal_code"];
        latlngInput.value = locationData["latlng"];
    }
}

function setPeople() {
    peopleContainer = document.getElementById("people-container");
    peopleTemplate = document.getElementById("people-template");
    peopleDisclaimer = document.getElementById("people-disclaimer");
    peopleSpinner = document.getElementById("people-spinner");

    populatePeople();
}
async function populatePeople() {
    const friends = await getUserData("writeonly/friends");

    if(friends) {
        peopleDisclaimer.classList.add("hidden");
        peopleSpinner.classList.remove("hidden");

        for(const [uid, displayName] of Object.entries(friends)) {
            addPerson(uid, displayName);
        }

        peopleSpinner.classList.add("hidden");
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

async function tryGetInputs() {
    //get all the data
    //prompt the user if the input is invalid
    const latlng = await tryGetLocation();
    if(!latlng) { return null; }

    const people = tryGetPeople();
    if(!people) { return null; }

    return {
        "latlng": latlng,
        "people": people
    };
}
async function tryGetLocation() {
    const address = addressInput.value;
    const city = cityInput.value;
    const state = stateInput.value;
    const zip = zipInput.value;
    const latlng = latlngInput.value;

    const data = await validateAddress(address, city, state, zip);
    if(data) {
        //geocode
        //error if invalid
    }
    if(latlng) {
        //reverse geocode
        //error if invalid
    }
    else {
        //error for no input
    }


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