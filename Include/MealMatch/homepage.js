import { getUserData, getCookie, removeCookie } from "./firebase-database.js";
let toolbar, login, logout, refresh;
let sessionContainer, sessionTemplate, spinner;

function toggleAssetVisibilty(isVisible) {  
    if(isVisible) {
        toolbar.classList.remove("hidden");
        refresh.classList.remove("hidden");
        logout.classList.remove("hidden");
        login.classList.add("hidden");
    }
    else {
        toolbar.classList.add("hidden");
        refresh.classList.add("hidden");
        logout.classList.add("hidden");
        login.classList.remove("hidden");
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

function addToHomepage(sessions) {
    for(const session in sessions) {
        const clone = sessionTemplate.content.cloneNode(true);

        const sessionElement = clone.querySelector("#session-element");
        sessionElement.classList.add("session-element");

        const creator = clone.querySelector("#creator");
        creator.textContent = session;

        //edit more fields
        //add click capability

        sessionContainer.append(clone);
    }
}
async function populateHomepage() {
    toggleSpinner(true);
    let uid = getCookie("uid");

    const _readonly = await getUserData("readonly");
    if(_readonly) {
        addToHomepage(_readonly["session"]);
    }

    const _writeonly = await getUserData("writeonly");
    if(_writeonly) {
        const sessionList = _writeonly["session_requests"];
        for(const session in sessionList) {
            addToHomepage(session);
        }
    }

    // popup if there is nothing added instructing users to create new session
    toggleSpinner(false);
}

function depopulateHomepage() {
    const elements = document.getElementsByClassName("session-element");
    for(let i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
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

function setOnClicks() {
    document.getElementById("refresh")
        .addEventListener("click", onRefresh);
    document.getElementById("logout")
        .addEventListener("click", onLogout);
}
function setVariables() {
    toolbar = document.getElementById("toolbar");
    login = document.getElementById("login");
    logout = document.getElementById("logout");
    refresh = document.getElementById("refresh");
    sessionContainer = document.getElementById("session-container");
    sessionTemplate = document.getElementById("session-template");
    spinner = document.getElementById("spinner");
}
function onDocumentLoad() {
    setOnClicks();
    setVariables();
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);
export { onLogin }