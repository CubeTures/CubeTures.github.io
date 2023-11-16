import { getUserData, getCookie } from "./firebase-database.js";
let friendcode, sendRequestInput;
let toastBootstrap;

function onDocumentLoad() {
    setFriendCode();
    setSendFriendRequest();
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
        if(isValidUser && notThisUser(code)) {
            sendRequest(code);
            sendRequestInput.value = "";
            showToast("Friend Request Sent!");
            return;
        }
    }
    
    showToast("Invalid Friend Code.");
}
function sendRequest(code) {
    //set with database to other user's writeonly
}
async function validUser(code) {
    const userData = await getUserData("readonly", code);
    if(userData) { return true; }
    return false;
}
function notThisUser(code) {
    const uid = getCookie("uid");
    return uid != code;
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