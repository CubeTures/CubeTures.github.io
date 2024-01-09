import { getDisplayName } from "../Firebase/firebase-database.js";
let photos, info, extra;
let expanded = false;
let id;
let display;

function onDocumentLoad() {
    setID();
    displayName();

    setExpand();
}

function setID() {
    const search = window.location.search;
    id = getID(search);
}
function getID(search) {
    const parameters = search.substring(1).split("&");
    for(const parameter of parameters) {
        const split = parameter.split("=");
        if(split[0] == "id") {
            return split[1];
        }
    }
    return "";
}

async function displayName() {
    display = document.getElementById("display");
    
    const name = await getDisplayName(id);
    display.textContent = `Displaying match created by ${name}.`;
}

function setExpand() {
    photos = document.getElementById("photos");
    info = document.getElementById("info");
    extra = document.getElementById("extra");
    
    info.addEventListener("click", expand);
}
function expand() {
    if(expanded) {
        //photos.classList.remove("photo-box-alt");
        //info.classList.remove("info-box-expand");
        extra.classList.remove("extra-box-alt");
    }
    else {
        //photos.classList.add("photo-box-alt");
        //info.classList.add("info-box-alt");
        extra.classList.add("extra-box-alt");
    }

    expanded = !expanded;
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);
