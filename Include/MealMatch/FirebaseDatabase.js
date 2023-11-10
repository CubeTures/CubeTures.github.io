import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
let userData, unsubscribeOnValue;

function getReference(uid) {
    const db = getDatabase();
    const path = `users/${uid}`;
    return ref(db, path);
}
function setUserData(snapshot, callback) {
    userData = snapshot.val();
    unsubscribeOnValue();
    callback();
}
function updateUserData(reference, callback) {
    unsubscribeOnValue = onValue(reference, 
        (snapshot) => setUserData(snapshot, callback));
}

function updateDisplay() {
    const elem = document.getElementById("data");
    elem.innerHTML = JSON.stringify(userData);
}

function getNewUserData(displayName) {
    return {
        "username": displayName,
        "friends": [],
        "friend_requests": [],
        "session": {},
        "session_requests": []
    }
}
function setNewUserData(reference, displayName) {
    let newUserData = getNewUserData(displayName);
    set(reference, newUserData);
    userData = newUserData;
}
function setupDatabase(user) {
console.log(`Logging in as ${user.displayName}`)
    const reference = getReference(user.uid);
    updateUserData(reference, () => {
        if(userData == null) {
            setNewUserData(reference, user.displayName);
        }
        updateDisplay();
    });
}

export { setupDatabase }