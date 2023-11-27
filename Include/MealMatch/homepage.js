import { getUserData, getFriendName, removeCookie } from "./firebase-database.js";
let toolbar, login, logout, refresh, disclaimer;
let matchContainer, matchTemplate, noMatchDisclaimer, spinner;

function onDocumentLoad() {
    setVariables();
    setOnClicks();
}
function setVariables() {
    toolbar = document.getElementById("toolbar");
    login = document.getElementById("login");
    logout = document.getElementById("logout");
    //refresh = document.getElementById("refresh");
    disclaimer = document.getElementById("login_disclaimer");
    matchContainer = document.getElementById("match-container");
    matchTemplate = document.getElementById("match-template");
    noMatchDisclaimer = document.getElementById("no-matches-disclaimer");
    spinner = document.getElementById("spinner");
}
function setOnClicks() {
    //document.getElementById("refresh")
        //.addEventListener("click", onRefresh);
    document.getElementById("logout")
        .addEventListener("click", onLogout);
}

function onLogin() {
    toggleAssetVisibilty(true);
    populateHomepage();
}
function onLogout() {
    toggleAssetVisibilty(false);
    depopulateHomepage();
    removeCookie("uid");
    removeCookie("displayName");
}
function onRefresh() {
    depopulateHomepage();
    populateHomepage();
}

async function populateHomepage() {
    toggleSpinner(true);
    setVisible(noMatchDisclaimer, false);

    let hasMatch = false;
    hasMatch = (await populatePersonal()) ? true : hasMatch;
    hasMatch = (await populateRequests()) ? true : hasMatch;
    console.log(`Has Match? ${hasMatch}`);

    setVisible(noMatchDisclaimer, !hasMatch);
    toggleSpinner(false);
}
async function populatePersonal() {
    const _readonly = await getUserData("readonly");
    const match = _readonly["match"];
    if(match) {
        addToHomepage(match, _readonly["display_name"]);
        return true;
    }

    return false;
}
async function populateRequests() {
    const requests = await getUserData("writeonly/match_requests");
    if(requests) {
        for(const uid in requests) {
            const match = await getUserData("readonly/match", uid);
            const friendName = await getFriendName(uid);
            addToHomepage(match, friendName);
        }
        return true;
    }
    return false;
}
function addToHomepage(match, creator) {
    const clone = matchTemplate.content.cloneNode(true);

    const matchElement = clone.querySelector("#match-element");
    matchElement.classList.add("match-element");

    const creatorText = clone.querySelector("#creator");
    creatorText.textContent = creator;

    //edit more fields
    //add click capability

    matchContainer.append(clone);
}

function depopulateHomepage() {
    const elements = document.getElementsByClassName("match-element");
    for(let i = elements.length - 1; i >= 0; i--) {
        elements[i].remove();
    }
}

function toggleAssetVisibilty(isVisible) {  
    if(isVisible) {
        setVisible(toolbar, true);
        //setVisible(refresh, true);
        setVisible(logout, true);
        setVisible(login, false);
        setVisible(disclaimer, false);
    }
    else {
        setVisible(toolbar, false);
        //setVisible(refresh, false);
        setVisible(logout, false);
        setVisible(login, true);
        setVisible(disclaimer, true);
    }
}
function setVisible(asset, isVisible) {
    if(isVisible) {
        asset.classList.remove("hidden");
    }
    else {
        asset.classList.add("hidden");
    }
}
function toggleSpinner(isVisible) {
    if(isVisible) {
        spinner.classList.remove("hidden");
    }
    else {
        spinner.classList.add("hidden");
    }
}   

document.addEventListener("DOMContentLoaded", onDocumentLoad);
export { onLogin }