import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
const listenOptions = { onlyOnce: true };

function getReference(uid, dataType) {
    const db = getDatabase();
    const path = `users/${uid}/${dataType}`;
    return ref(db, path);
}
function getUserData(dataType, callback) {
    let uid = getCookie("uid");
    let reference = getReference(uid, dataType);
    onValue(reference, (snapshot) => {
        callback(snapshot.val());
    }, listenOptions);
}

function getCookie(cookieName) {
    let cookieList = document.cookie.split(" ");
    for(let cookie of cookieList) {
        let spl = cookie.split("=");
        if(spl[0] == cookieName) {
            return spl[1];
        }
    }

    console.log(`${cookieName} not found in cookies`);
    return null;
}

export { getUserData, getCookie }