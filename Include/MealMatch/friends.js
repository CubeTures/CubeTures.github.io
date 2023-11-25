import { getUserData, updateUserData, getCookie } from "./firebase-database.js";
let friendcode, sendRequestInput;
let toastBootstrap;

function onDocumentLoad() {
    setFriendCode();
    setSendFriendRequest();
    setFriendRequests();
    setToast();
}

function setFriendCode() {
    friendcode = document.getElementById("friendcode");
    friendcode.textContent = getCookie("uid");

    document.getElementById("copy")
        .addEventListener("click", copyToClipboard);
}
function copyToClipboard() {
    const code = friendcode.textContent;
    navigator.clipboard.writeText(code);
    showToast("Copied to Clipboard!");
}

function setSendFriendRequest() {
    sendRequestInput = document.getElementById("friend-request-input");
    document.getElementById("send-request")
        .addEventListener("click", sendFriendRequest);
}
async function sendFriendRequest() {
    const code = sendRequestInput.value;
    if(code) {
        let isValidUser = await validUser(code);
        let thisUser = isThisUser(code);
        let alreadFriend = await alreadyFriend(code)
        if(isValidUser && !thisUser && !alreadFriend) {
            sendRequest(code);
            sendRequestInput.value = "";
            showToast("Friend Request Sent!");
            return;
        }
        else if(!isValidUser) {
            showToast("Invalid Friend Code.");
        }
        else if(thisUser) {
            showToast("Cannot use own Friend Code.");
        }
        else if(alreadFriend) {
            showToast("User is already your Friend.");
        }
    }
    else {
        showToast("No Friend Code was input.");
    }
}
function sendRequest(code) {
    let data = {};
    data[getCookie("uid")] = true
    updateUserData("writeonly/friend_requests", data, code);
}
async function validUser(code) {
    const userData = await getUserData("readonly", code);
    if(userData) { return true; }
    return false;
}
function isThisUser(code) {
    const uid = getCookie("uid");
    return uid == code;
}
async function alreadyFriend(code) {
    const friends = await getUserData("writeonly/friends");
    if(friends && code in friends) {
        return true;
    }
    return false;
}

function setFriendRequests() {
    //set toggle caret functionality
    //set the number of requests
    //populate list
    //set accept and decline functionality for each request
}

function setToast() {
    const toast = document.getElementById('liveToast');
    toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
}
function showToast(message) {
    const toastText = document.getElementById("toast-text");
    toastText.textContent = message;
    toastBootstrap.show();
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);