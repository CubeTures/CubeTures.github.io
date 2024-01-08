import { getUserData, removeCookie } from "../Firebase/firebase-database.js";
import { login, logout, loginStatus } from "../Firebase/firebase-login.js";
let toolbar, loginBtn, logoutBtn, disclaimer;
let matchContainer, matchTemplate, noMatchDisclaimer, spinner;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function onDocumentLoad() {
    setLogging();
    setMatches();
    checkLoginStatus();
}

function setLogging() {
    toolbar = document.getElementById("toolbar");
    loginBtn = document.getElementById("login");
    logoutBtn = document.getElementById("logout");
    disclaimer = document.getElementById("login_disclaimer");

    loginBtn.addEventListener("click", tryLogin);
    logoutBtn.addEventListener("click", tryLogout);
    //if(hasCookie("uid")) { login(); }
}

function tryLogin() {
    login(onLogin, loginFailure);
}
function onLogin() {
    console.log(`Log in success.`);
    toggleAssetVisibilty(true);
    populateHomepage();
}
function loginFailure(error) {
    console.error(`Log in error: ${error}`);
}

function tryLogout() {
    logout(onLogout, logoutFailure);
}
function onLogout() {
    console.log("Log out success.");

    toggleAssetVisibilty(false);
    toggleSpinner(false);
    depopulateHomepage();
    removeAllCookies();

    console.log(document.cookie);
}
function logoutFailure(error) {
    console.error(`Log out error: ${error}`);
}

function setMatches() {
    matchContainer = document.getElementById("match-container");
    matchTemplate = document.getElementById("match-template");
    noMatchDisclaimer = document.getElementById("no-matches-disclaimer");
    spinner = document.getElementById("spinner");
}

async function populateHomepage() {
    toggleSpinner(true);
    setVisible(noMatchDisclaimer, false);

    let hasMatch = false;
    hasMatch = (await populatePersonalMatch()) ? true : hasMatch;
    hasMatch = (await populateMatchRequests()) ? true : hasMatch;

    setVisible(noMatchDisclaimer, !hasMatch);
    toggleSpinner(false);
}
async function populatePersonalMatch() {
    const match = await getUserData("public/match");
    if(match) {
        const displayName = await getUserData("readonly/display_name");
        addToHomepage(match, displayName);
        return true;
    }

    return false;
}
async function populateMatchRequests() {
    const requests = await getUserData("writeonly/match_requests");
    if(requests) {
        for(const uid in requests) {
            const match = await getUserData("public/match", uid);
            const friendName = await getUserData("readonly/display_name", uid);
            addToHomepage(match, friendName);
        }
        
        return true;
    }

    return false;
}
function addToHomepage(match, creator) {
    console.log(creator);
    console.log(match);
    
    const clone = matchTemplate.content.cloneNode(true);

    const matchElement = clone.querySelector("#match-element");
    matchElement.classList.add("match-element");

    const creatorText = clone.querySelector("#creator");
    creatorText.textContent = creator;

    const date = clone.querySelector("#date");
    date.textContent = getDate(match);

    const address = clone.querySelector("#address");
    address.textContent = match["address"];

    const people = clone.querySelector("#people");
    people.textContent = getPeople(match);

    matchContainer.append(clone);
}
function getDate(match) {
    const dateSplit = match["date"].split("/");
    const timeSplit = match["time"].split(" ");
    const timeNum = timeSplit[0].split(":");

    const month = months[dateSplit[0] - 1];
    const newDate = `${month} ${dateSplit[1]}`;
    const newTime = `${timeNum[0]}:${timeNum[1]} ${timeSplit[1]}`;
    return `${newDate} at ${newTime}`;
}
function getPeople(match) {
    let people = "";
    for(const [ id, person ] of Object.entries(match["people"])) {
        people += `${(people == "" ? "" : ", ")}${person}`;
    }
    
    return people;
}

function depopulateHomepage() {
    const elements = document.getElementsByClassName("match-element");
    for(let i = elements.length - 1; i >= 0; i--) {
        elements.item(i).remove();
    }
}

function checkLoginStatus() {
    setTimeout(waitForLoginStatus, 500);
}
function waitForLoginStatus() {
    if(loginStatus === null) {
        waitForLoginStatus();
    }
    else {
        computeLoginStatus();
    }
}
function computeLoginStatus() {
    if(loginStatus) {
        onLogin();
    }
}

function toggleAssetVisibilty(isVisible) {  
    if(isVisible) {
        setVisible(toolbar, true);
        setVisible(logoutBtn, true);
        setVisible(loginBtn, false);
        setVisible(disclaimer, false);
    }
    else {
        setVisible(toolbar, false);
        setVisible(logoutBtn, false);
        setVisible(loginBtn, true);
        setVisible(disclaimer, true);
        setVisible(noMatchDisclaimer, false);
    }
}
function setVisible(asset, isVisible) {
    if(isVisible) {
        asset.classList.remove("visually-hidden");
    }
    else {
        asset.classList.add("visually-hidden");
    }
}
function toggleSpinner(isVisible) {
    if(isVisible) {
        spinner.classList.remove("visually-hidden");
    }
    else {
        spinner.classList.add("visually-hidden");
    }
}   

function removeAllCookies() {
    removeCookie("uid");
    removeCookie("refreshToken");
}

function setOnClick(elementID, callback) {
    document.getElementById(elementID)
        .addEventListener("click", callback);
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);