import { getUserData, updateUserData, removeUserData, getCookie } from "./firebase-database.js";
let thisUserDisplayName;
let friendcode, sendRequestInput;
let requestDiv, requestCaret, requestAmount, requestDropdown, requestTemplate;
let friendDiv, friendCaret, friendAmount, friendDropdown, friendTemplate;
let expandedCaret = "/Images/MealMatch/Expand_down.svg";
let collapsedCaret = "/Images/MealMatch/Expand_up.svg";
let toastBootstrap;

function onDocumentLoad() {
    setDisplayName();
    setFriendCode();
    setSendFriendRequest();
    setFriendRequests();
    setFriends();
    setToast();
}

async function setDisplayName() {
    thisUserDisplayName = await getUserData("readonly/display_name");
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
async function sendRequest(code) {
    let data = {};
    data[getCookie("uid")] = thisUserDisplayName;
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
    requestDiv = document.getElementById("request-div");
    requestCaret = document.getElementById("request-caret");
    requestAmount = document.getElementById("request-amount");
    requestDropdown = document.getElementById("request-dropdown");
    requestTemplate = document.getElementById("request-template");
    
    let requestCount = await populateFriendRequests();
    if(requestCount > 0) {
        requestDiv.addEventListener("click", toggleRequests);
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

    requestAmount.textContent = `(${requestCount})`;
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
        requestDiv.removeEventListener("click", toggleRequests);
    }

    removeUserData(`writeonly/friend_requests/${code}`);

    if(isYes) {
        const thisFriendList = {};
        thisFriendList[code] = displayName;
        updateUserData("writeonly/friends", thisFriendList);
        
        const otherFriendList = {};
        otherFriendList[getCookie("uid")] = thisUserDisplayName;
        updateUserData("writeonly/friends", otherFriendList, code);
    }
}
function decrementRequestAmount() {
    const textContent = requestAmount.textContent;
    const stringAmount = textContent.substring(1, textContent.length - 1);
    let intAmount = parseInt(stringAmount) - 1;
    requestAmount.textContent = `(${intAmount})`;
    return intAmount;
}

async function setFriends() {
    friendDiv = document.getElementById("friend-div");
    friendCaret = document.getElementById("friend-caret");
    friendAmount = document.getElementById("friend-amount");
    friendDropdown = document.getElementById("friend-dropdown");
    friendTemplate = document.getElementById("friend-template");
    
    let friendCount = await populateFriends();
    if(friendCount > 0) {
        friendDiv.addEventListener("click", toggleFriends);
    }
}
function toggleFriends() {
    let isExpanded = friendCaret.hasAttribute("expanded");
    if(isExpanded) {
        setFriendDropdown(false);
    }
    else {
        setFriendDropdown(true);
    }
}
function setFriendDropdown(isVisibile) {
    setVisible(friendDropdown, isVisibile);

    if(isVisibile) {
        friendCaret.src = expandedCaret;
        friendCaret.setAttribute("expanded", "");
    }
    else {
        friendCaret.src = collapsedCaret;
        friendCaret.removeAttribute("expanded");
    }
}
async function populateFriends() {
    const friends = await getUserData("writeonly/friends");
    console.log(JSON.stringify(friends, null, 2));

    let friendCount = 0;
    if(friends) {
        for(const [code, displayName] of Object.entries(friends)) {
            addFriend(code, displayName);
            friendCount++;
        }
    }
    
    friendAmount.textContent = `(${friendCount})`;
    return friendCount;
}
function addFriend(code, displayName) {
    const clone = friendTemplate.content.cloneNode(true);
    
    const displayNameText = clone.querySelector("#display-name");
    displayNameText.textContent = displayName;

    const remove = clone.querySelector("#remove");
    remove.addEventListener("click", (event) => { 
        const wrapper = event.target.closest("#friend-wrapper");
        removeFriend(wrapper, code);
    });

    friendDropdown.append(clone);
}
function removeFriend(wrapper, code) {
    wrapper.remove();

    let friendCount = decrementFriendAmount();
    console.log(friendCount);
    if(friendCount <= 0) {
        setFriendDropdown(false);
        friendDiv.removeEventListener("click", toggleFriends);
    }

    const uid = getCookie("uid");
    removeUserData(`writeonly/friends/${code}`);
    removeUserData(`writeonly/friends/${uid}`, code);
}
function decrementFriendAmount() {
    const textContent = friendAmount.textContent;
    const stringAmount = textContent.substring(1, textContent.length - 1);
    let intAmount = parseInt(stringAmount) - 1;
    friendAmount.textContent = `(${intAmount})`;
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