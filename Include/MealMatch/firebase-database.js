import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

async function getUserData(dataType, otherUID=null) {
    let uid = "";
    if(otherUID) {
        uid = otherUID;
    }
    else {
        uid = getCookie("uid");
    }

    let reference = getReference(uid, dataType);
    const snapshot = await get(reference);
    return snapshot.val();
}
function getReference(uid, dataType) {
    const db = getDatabase();
    const path = `users/${uid}/${dataType}`;
    return ref(db, path);
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
            return spl[1].substring(0, spl[1].length - 1);
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
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }
}

export { getUserData, hasCookie, getCookie, setCookie, removeCookie }
