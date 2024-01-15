import { getUserData } from "../Firebase/firebase-database.js";
import MatchTile from "./match-tile.js";
let id, slot, template;


function onDocumentLoad() {
    setID();
    setTile();
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

function setTile() {
    slot = document.getElementById("slot");
    template = document.getElementById("template");
    
    createTiles();
}

async function createTiles() {
    const locations = await getUserData("public/match/locations", id);

    const len = Object.keys(locations).length;
    let count = 0;
    for(const [ id, location ] of Object.entries(locations)) {
        const active = (len - 2) <= count++;
        const clone = template.content.cloneNode(true);
        new MatchTile(clone, id, location, decision, active);
        slot.append(clone);
    }

    hidePlaceholder();
}
function hidePlaceholder() {
    const placeholder = document.getElementById("placeholder");
    placeholder.classList.add("visually-hidden");
}

function decision(isYes) {
    console.log(isYes?"Yes to this":"No to this");
}


document.addEventListener("DOMContentLoaded", onDocumentLoad);
