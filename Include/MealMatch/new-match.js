import { getUserData } from "./firebase-database.js"
import { getCurrentLocation, validateAddress } from "./google-geocode.js";
let addressInput, cityInput, stateInput, zipInput, latlngInput;
let locationSpinner, locationErrorModal, locationErrorText;
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
    locationErrorModal = new bootstrap.Modal(document.getElementById("locationErrorModal"), {});
    locationErrorText = document.getElementById("location-error-text");

    setOnClick("current-location", setCurrentLocation);
}
async function setCurrentLocation() {
    locationSpinner.classList.remove("hidden");
    const locationData = await getCurrentLocation(locationError);
    locationSpinner.classList.add("hidden");

    if(locationData) {
        const address = locationData["address"];
        addressInput.value = `${address["street_number"]} ${address["route"]}`;
        cityInput.value = address["locality"];
        stateInput.value = address["administrative_area_level_1"];
        zipInput.value = address["postal_code"];
        latlngInput.value = locationData["latlng"];
    }
    else {
        locationError();
    }
}
function locationError(errorCode=0) {
    //make modal static
    if(errorCode == 1) {
        locationErrorText.innerHMTL = "MealMatch could not access your location. " +
            "Please change your location permissions or type the address manually.";
    }
    else if(errorCode == 4) {
        locationErrorText.innerHTML = "The address you entered could not be identified. " +
            "Please fix any mistakes in the address and try again " +
            "or click <img src='/Images/MealMatch/Pin_alt.svg'> to automatically get your location.";
    }
    else {
        locationErrorText.innerHTML = "There was an error in getting your location. " +
            "Please type the address manually.";
    }

    locationErrorModal.show();
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
function peopleError(locationError=false) {
    //if location error,
    //  then attach activation for the people modal to the closing of the location modal
    //  remove the activation after it is clicked
}

function setMatch() {
    setOnClick("match", tryMatch);
}
async function tryMatch() {
    const inputData = await tryGetInputs();
    if(inputData) {
        console.log("No errors, creating search.");

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
    let locErr = false;
    const locationData = await tryGetLocation();
    if(!locationData) { 
        locErr = true;
        locationError(4); 
    }
    else if(locationData["inferred"]) {
        //ask the user if the address generated is correct
        //two options:
        //  Yes
        //  No, Cancel Match
    }

    const people = tryGetPeople();
    if(!people) { peopleError(locErr); } 

    return {
        "locationData": locationData,
        "people": people
    };
}
async function tryGetLocation() {
    const address = addressInput.value;
    const city = cityInput.value;
    const state = stateInput.value;
    const zip = zipInput.value;
    const latlng = latlngInput.value;
    //check if boxes were edited since pressing getCurrentLocation, 
    //  if not, then use values from latlngInput

    const data = await validateAddress(address, city, state, zip); //add last paramter for inferredCallback
    return data;
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
        return null;
    }

    return people;
}

function setOnClick(elementID, callback) {
    document.getElementById(elementID)
        .addEventListener("click", callback);
}


document.addEventListener("DOMContentLoaded", onDocumentLoad);