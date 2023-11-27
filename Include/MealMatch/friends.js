import { getUserData, updateUserData, removeUserData, getCookie } from "./firebase-database.js";
let friendcode, sendRequestInput;
let requestCaret, requestAmount, requestDropdown, requestTemplate;
let expandedCaret = "/Images/MealMatch/Expand_down.svg";
let collapsedCaret = "/Images/MealMatch/Expand_up.svg";
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

async function setFriendRequests() {
    requestCaret = document.getElementById("request-caret");
    requestAmount = document.getElementById("request-amount");
    requestDropdown = document.getElementById("request-dropdown");
    requestTemplate = document.getElementById("request-template");
    
    let requestCount = await populateFriendRequests();
    if(requestCount > 0) {
        requestCaret.addEventListener("click", toggleRequests);
    }
}
function toggleRequests() {
    let isExpanded = requestCaret.hasAttribute("expanded");
    if(isExpanded) {
        setRequestDropdown(false);
    }
    else {
        setRequestDropdown(true);
    }
}
function setRequestDropdown(isVisibile) {
    setVisible(requestDropdown, isVisibile);

    if(isVisibile) {
        requestCaret.src = expandedCaret;
        requestCaret.setAttribute("expanded", "");
    }
    else {
        requestCaret.src = collapsedCaret;
        requestCaret.removeAttribute("expanded");
    }
}
async function populateFriendRequests() {
    const requests = await getUserData("writeonly/friend_requests");

    let requestCount = 0;
    if(requests) {
        for(const [code, displayName] of Object.entries(requests)) {
            addRequest(code, displayName);
            requestCount++;
        }
    }

    requestAmount.textContent = `[${requestCount}]`;
    return requestCount;
}
function addRequest(code, displayName) {
    const clone = requestTemplate.content.cloneNode(true);
    
    const displayNameText = clone.querySelector("#display-name");
    displayNameText.textContent = displayName;

    const decline = clone.querySelector("#decline");
    decline.addEventListener("click", (event) => { 
        const wrapper = event.target.closest("#request-wrapper");
        answerRequest(wrapper, code, displayName, false);
    });

    const accept = clone.querySelector("#accept");
    accept.addEventListener("click", (event) => { 
        const wrapper = event.target.closest("#request-wrapper");
        answerRequest(wrapper, code, displayName, true);
    });

    requestDropdown.append(clone);
}

async function answerRequest(wrapper, code, displayName, isYes) {
    wrapper.remove();
    
    let requestCount = decrementRequestAmount();
    if(requestCount <= 0) {
        setRequestDropdown(false);
        requestCaret.removeEventListener("click", toggleRequests);
    }

    removeUserData(`writeonly/friend_requests/${code}`);

    if(isYes) {
        const thisFriendList = {};
        thisFriendList[code] = displayName;
        updateUserData("writeonly/friends", thisFriendList);

        const thisDisplayName = await getUserData("readonly/display_name");
        const otherFriendList = {};
        otherFriendList[getCookie("uid")] = thisDisplayName;
        updateUserData("writeonly/friends", otherFriendList, code);
    }
}
function decrementRequestAmount() {
    const textContent = requestAmount.textContent;
    const stringAmount = textContent.substring(1, textContent.length - 1);
    let intAmount = parseInt(stringAmount) - 1;
    requestAmount.textContent = `[${intAmount}]`;
    return intAmount;
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

function setVisible(asset, isVisible) {
    if(isVisible) {
        asset.classList.remove("hidden");
    }
    else {
        asset.classList.add("hidden");
    }
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);