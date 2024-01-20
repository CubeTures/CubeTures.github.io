import { getDatabase, ref, get, set, update, onValue, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
let auth = null;

function checkAuth() {
    if(auth === null) {
        auth = getAuth();
    }    
}

function getUID(otherUID) {
    if(otherUID) {
        return otherUID;
    }
    return getCookie("uid");
}
function getReference(uid, dataType) {
    checkAuth();
    const db = getDatabase();
    const path = `users/${uid}/${dataType}`;
    //console.log(path);
    return ref(db, path);
}
async function hasUser(otherUID=null) {
    const data = await getUserData("readonly", otherUID);
    return data && data.hasOwnProperty("display_name");
}
async function getUserData(dataType, otherUID=null) {
    const uid = getUID(otherUID);
    const reference = getReference(uid, dataType);
    const snapshot = await get(reference);
    return snapshot.val();
}
async function setUserData(dataType, data, otherUID=null) {
    const uid = getUID(otherUID);
    const reference = getReference(uid, dataType);
    set(reference, data);
}
async function updateUserData(dataType, data, otherUID=null) {
    const uid = getUID(otherUID);
    const reference = getReference(uid, dataType);
    update(reference, data);
}
async function onUserData(dataType, callback, otherUID=null) {
    const uid = getUID(otherUID);
    const reference = getReference(uid, dataType);
    onValue(reference, callback);
}
function removeUserData(dataType, otherUID=null) {
    const uid = getUID(otherUID);
    const reference = getReference(uid, dataType);
    remove(reference);
}

async function getDisplayName(otherUID=null) {
    const uid = getUID(otherUID);
    return await getUserData("readonly/display_name", uid);
}

function hasCookie(cookieName) {
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(cookieName + '=');
    });
}
function getCookie(cookieName) {
    let cookieList = document.cookie.split(" ");
    for(let cookie of cookieList) {
        let spl = cookie.split("=");
        if(spl[0] == cookieName) {
            if(spl[1].indexOf(";") >= 0) {
                return spl[1].substring(0, spl[1].indexOf(";"));
            }
            return spl[1];
        }
    }

    console.log(`${cookieName} not found in cookies`);
    return null;
}
function setCookie(cookieName, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = cookieName + "=" + (value || "")  + expires + "; path=/";
}
function removeCookie(cookieName) {
    if(hasCookie(cookieName)) {
        document.cookie = `${cookieName}=;path=/;domain=${location.hostname};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
}

export { hasUser, getUserData, setUserData, updateUserData,
    onUserData, removeUserData, getDisplayName,
    hasCookie, getCookie, setCookie, removeCookie }
