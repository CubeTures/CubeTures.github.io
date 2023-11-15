import { getUserData, getCookie } from "./firebase-database.js";
let toastBootstrap;

function copyToClipboard() {
    const friendcode = document.getElementById("friendcode");
    const code = friendcode.textContent;
    navigator.clipboard.writeText(code);
    toastBootstrap.show();
}
function setFriendCode() {
    const toast = document.getElementById('liveToast');
    toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);

    const friendcode = document.getElementById("friendcode");
    friendcode.textContent = getCookie("uid");

    document.getElementById("copy")
        .addEventListener("click", copyToClipboard);
}

function onDocumentLoad() {
    setFriendCode();
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);