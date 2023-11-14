import { getUserData, getCookie } from "./firebase-database.js";
let sessionContainer, sessionTemplate;

function toggleAssetVisibilty(isVisible) {
    let toolbar = document.getElementById("toolbar");
    let refresh = document.getElementById("refresh");
    let login = document.getElementById("login");
    
    if(isVisible) {
        toolbar.classList.remove("hidden");
        refresh.classList.remove("hidden");
        login.classList.add("hidden");
    }
    else {
        toolbar.classList.add("hidden");
        refresh.classList.add("hidden");
        login.classList.remove("hidden");
    }
}

function addToHomepage(session) {
    // how to append an actual elemtent?
    sessionContainer.insertAdjacentHTML("beforeend", sessionTemplate);
    //edit template for each session, add to correct div
}
function populateHomepage() {
    let uid = getCookie("uid");
    console.log(`Populating with uid ${uid}`);

    getUserData("readonly", (userData) => {
        addToHomepage(userData[uid]);
    });
    getUserData("writeonly", (userData) => {
        let sessionList = userData["session_requests"];
        for(let session in sessionList) {
            addToHomepage(session);
        }
    });
}

function onLogin() {
    toggleAssetVisibilty(true);
    populateHomepage();
}
function onLogout() {
    toggleAssetVisibilty(false)
    //remove cookie
}

function onDocumentLoad() {
    document.getElementById("refresh")
        .addEventListener("click", populateHomepage);
    document.getElementById("logout")
        .addEventListener("click", onLogout);
    
    sessionContainer = document.getElementById("session-container");
    sessionTemplate = document.getElementById("session-template");
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);
export { onLogin }