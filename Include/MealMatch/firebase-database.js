import { getDatabase, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
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
    return ref(db, path);
}
async function hasUser(otherUID=null) {
    const data = await getUserData("readonly", otherUID);
    return data && data.hasOwnProperty("display_name");
}
async function getUserData(dataType, otherUID=null) {
    let uid = getUID(otherUID);
    let reference = getReference(uid, dataType);
    const snapshot = await get(reference);
    return snapshot.val();
}
async function updateUserData(dataType, data, otherUID=null) {
    let uid = getUID(otherUID);
    let reference = getReference(uid, dataType);
    update(reference, data);
}
function removeUserData(dataType, otherUID=null) {
    let uid = getUID(otherUID);
    let reference = getReference(uid, dataType);
    remove(reference);
}

async function getFriendName(code) {
    const userData = await getUserData("writeonly/friends");
    return userData[code];
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

function testUserData() {
    //addPersonalMatch();
    //addMatchRequest();    
    //addPersonalMatchRequest();    
    //removeUserData("readonly/match");
    //removeUserData("writeonly/match_requests");
    //removeUserData("readonly/match", "fakeID");
}
function addPersonalMatch() {
    updateUserData("readonly/match", {
        "latlng": [0, 0],
        "radius": 0,
        "people": {
            "uid1": "displayName1", 
            "uid2": "displayName2"
        },
        "locations": {
            "loc_a": "Y",
            "loc_b": "M",
            "loc_c": "N",
            "loc_d": "U"
        }
    });
}
function addMatchRequest() {
    updateUserData("writeonly/match_requests", {
        "fakeID": true
    });
}
function addPersonalMatchRequest() {
    updateUserData("readonly/match", {
        "latlng": [0, 0],
        "radius": 0,
        "people": {
            "uid1": "displayName1", 
            "uid2": "displayName2"
        },
        "locations": {
            "loc_a": "Y",
            "loc_b": "M",
            "loc_c": "N",
            "loc_d": "U"
        }
    }, "fakeID");
}
testUserData();

export { hasUser, getUserData, updateUserData, removeUserData, getFriendName,
    hasCookie, getCookie, setCookie, removeCookie }
