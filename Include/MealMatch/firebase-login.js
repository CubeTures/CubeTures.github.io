import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider,
    signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { hasUser, updateUserData, setCookie, getCookie } from "./firebase-database.js";
import { REFRESH_TOKEN_URL, refreshHeader, getRefreshParameters } from "./google-api.js";
import { postRequest } from "../api-commands.js";
const homepagePath = "/Pages/MealMatch/home.html";
let onAuthStateUnsubscribe, loginStatus = null;

function onContentLoad() {
    checkRelogin();
}
async function checkRelogin() {
    const auth = await getAuth();
    onAuthStateUnsubscribe = auth.onAuthStateChanged((user) => {
        if(!user) {
            tryRelogin();
        }
        else {
            console.log("User still logged in.");
            loginStatus = true;
        }
    });
}
async function tryRelogin() {
    onAuthStateUnsubscribe();

    const refreshToken = getCookie("refreshToken");
    if(refreshToken) {
        await postRequest(REFRESH_TOKEN_URL, refreshHeader, getRefreshParameters(refreshToken));
        loginStatus = true;
    }
    else {
        loginStatus = false;
        if(window.location.pathname != homepagePath) {
            console.log("Cannot log in user. Redirecting.");
            window.location.replace(`${window.location.origin}${homepagePath}`);
        }
    }
}

function login(successCallback, errorCallback) {
    const auth = getAuth();
    try {
        setPersistence(auth, browserLocalPersistence)
        .then(() => {
            signInWithPopup(auth, new GoogleAuthProvider())
                .then((result) => {
                    loginUser(result.user, successCallback);
                });
        });
    }
    catch(error) {
        errorCallback(error);
    }
}

function loginUser(user, successCallback) {
    if(!existingUser(user)) {
        newLogin(user);
    }
    setCookie("uid", user.uid);
    setCookie("refreshToken", user.refreshToken);

    successCallback();
}
function existingUser(user) {
    return hasUser(user.uid);
}
function newLogin(user) {
    setDisplayName(user);
}
function setDisplayName(user) {
    let data = {};
    data["display_name"] = user.displayName;
    updateUserData("readonly", data);
}

function logout(successCallback, errorCallback) {
    getAuth().signOut()
        .then(() => {
            successCallback();
        })
        .catch((error) => {
            errorCallback(error);
        });
}


document.addEventListener("DOMContentLoaded", onContentLoad);
export { login, logout, loginStatus };