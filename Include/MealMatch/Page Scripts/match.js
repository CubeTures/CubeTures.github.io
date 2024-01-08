import { getDisplayName } from "../Firebase/firebase-database.js";
const matchPageUrl = "/Pages/MealMatch/match.html";
let id;
let display;

function onDocumentLoad() {
    setID();
    displayName();
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

function goToMatch(id) {
    const origin = window.location.origin;
    window.location.href = `${origin}${matchPageUrl}?id=${id}`;
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);
export { goToMatch };