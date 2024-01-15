import { getUserData } from "../Firebase/firebase-database.js";
let id;
let photos, info, extra;
let tile, noBtn, yesBtn;
let startX, maxDist, tolerance;
const primaryRGB = "251,70,112", borderRGB = "249,190,203";
const weekdayAbrv = { 
    "Monday": "M",
    "Tuesday": "T",
    "Wednesday": "W",
    "Thursday": "R",
    "Friday": "F",
    "Saturday": "S",
    "Sunday": "U"
};
let expanded = false;


function onDocumentLoad() {
    setID();
    setSwitch();
    setTile();
}

function setID() {
    const search = window.location.search;
    id = getID(search);
}
function getID(search) {
    const parameters = search.substring(1).split("&");
    for(const parameter of parameters) {
        const split = parameter.split("=");
        if(split[0] == "id") {
            return split[1];
        }
    }
    return "";
}

function setSwitch() {
    photos = document.getElementById("photos");
    info = document.getElementById("info");
    extra = document.getElementById("extra");
    
    info.addEventListener("click", switchDisplay);
}
function switchDisplay() {
    if(expanded) {
        extra.classList.remove("extra-box-alt");
    }
    else {
        extra.classList.add("extra-box-alt");
    }

    expanded = !expanded;
}

function setTile() {
    tile = document.getElementById("tile");
    noBtn = document.getElementById("no");
    yesBtn = document.getElementById("yes");

    const width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
    maxDist = width / 3;
    tolerance = width / 9;

    populateTiles();

    tile.addEventListener("mousedown", e => startDragTile(e));
    tile.addEventListener("touchstart", e => startDragTile(e));
}

async function populateTiles() {
    const locations = await getUserData("public/match/locations", id);
    console.log(locations);

    const placeholder = document.getElementById("placeholder");
    placeholder.classList.add("visually-hidden");

    for(const [ id, location ] of Object.entries(locations)) {
        createTile(id, location);
        break;
    }
}
function createTile(id, location) {
    //create copy

    document.getElementById("tile").setAttribute("location", id);

    setInfo(location);
    setExtra(location);
    setImages(location);
}
function setInfo(location) {
    const name = document.querySelector("#name");
    name.textContent = location["name"];

    const category = document.querySelector("#category");
    category.textContent = location["category"];

    const price = document.querySelector("#price");
    price.textContent = parsePriceLevel(location["price"]);

    const distance = document.querySelector("#distance");
    distance.textContent = formatDistance(location["distance"]);
}
function setExtra(location) {
    const address = document.querySelector("#address");
    address.textContent = location["address"];
    address.setAttribute("href", location["maps"]);

    const website = document.querySelector("#website");
    website.textContent = getWebsiteText(location["website"]);
    website.setAttribute("href", location["website"]);

    const phone = document.querySelector("#phone");
    phone.textContent = location["phone"];
    phone.setAttribute("href", getPhoneHref(location["phone"]));

    const rating = document.querySelector("#rating");
    rating.textContent = formatRating(location["rating"]);

    const hours = document.querySelector("#hours");
    const hoursArray = location["hours"].split(",");
    hours.innerHTML = getHoursTable(hoursArray);
}
function setImages(location) {
    //images
}

function parsePriceLevel(price) {
    const head = "PRICE_LEVEL_";
    const index = price.indexOf(head);
    const value = price.substring(index + head.length);

    switch(value) {
        case "FREE":
            return "Free";
        case "INEXPENSIVE":
            return "Cheap";
        case "MODERATE":
            return "Affordable";
        case "EXPENSIVE":
            return "Pricy";
        case "VERY_EXPENSIVE":
            return "Expensive";
    }

    return "NaN";
}
function formatDistance(distance) {
    const rounded = parseFloat(distance).toFixed(2);
    const s = (rounded == "1.00") ? "" : "s";
    return `${rounded} Miles Away`;
}

function getWebsiteText(urlStr) {
    const url = new URL(urlStr);
    return url.hostname;
}
function getPhoneHref(phone) {
    return `tel:${phone.replace(/[^0-9]+/g, '')}`;
}
function formatRating(rating) {
    return `${rating}/5`;
}

function getHoursTable(hoursArray) {
    const head = getHoursHead();
    
    let body = "";
    for(const hour of hoursArray) {
        body += getHoursBody(hour);
    }

    return `<table class="table table-dark table-borderless">
            ${head}
            <tbody class="top-border">${body}</tbody>
        </table>`;
}
function getHoursHead() {
    return ""+
    `<thead>
        <tr>
            <th scope="col">Day</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
        </tr>
    </thead>`;
}
function getHoursBody(hour) {
    const parse = parseHour(hour);
    const { day, open, close } = parse;
    
    return ""+
    `<tr>
        <td scope="row">${day}</td>
        <td>${open}</td>
        <td>${close}</td>
    </tr>`;
}
function parseHour(hour) {
    const firstColon = hour.indexOf(":");
    const day = hour.substring(0, firstColon);
    const times = hour.substring(firstColon + 1).trim();
    const [ open, close ] = parseTime(times);

    return {
        "day": weekdayAbrv[day],
        "open": open,
        "close": close
    };
}
function parseTime(times) {
    const cleaned = times.replace(/\s+/g, '');
    const [ openFull, closeFull ] = cleaned.split("–");

    let open = "-", close = "-";
    if(openFull && isNumeric(openFull.substring(0, 1))) {
        open = get24Hour(openFull);
    }
    if(closeFull && isNumeric(closeFull.substring(0, 1))) {
        close = get24Hour(closeFull);
    }

    return [ open, close ]; 
}
function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}
function get24Hour(time) {
    const num = time.substring(0, time.length - 2);
    const colon = time.indexOf(":");
    const alt = time.substring(time.length - 2);

    if(alt == "AM" && num.substring(0, colon) == "12") {
        return `00${num.substring(colon)}`;
    }
    else if(alt == "PM") {
        const toInt = parseInt(num.substring(0, colon));
        return `${toInt + 12}${num.substring(colon)}`;
    }

    return num;
}



function startDragTile(e) {
    const { x } = getPosition(e);
    startX = x;
    setTransitions(false);
    
    document.addEventListener("mousemove", e => dragTile(e));
    document.addEventListener("touchmove", e => dragTile(e));
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
    document.addEventListener("touchcancel", stopDrag);
}
function dragTile(e) {
    if(!startX) { return; }
    const { x } = getPosition(e);
    const offsetX = x - startX;

    if(offsetX > tolerance || offsetX < -tolerance) {
        let movement = (offsetX - (offsetX > 0 ? tolerance : -tolerance));
        highlightButton(movement);
        tile.style.transform = `translate(${movement}px, 0px)`;
    }
}
function stopDrag() {
    startX = null;
    document.removeEventListener("mousemove", dragTile);
    setTransitions(true);
    resetActors();
}

function setTransitions(state) {
    const transition = "all .3s ease-out";
    tile.style.transition = state ? transition : "none";
    noBtn.style.transition = state ? transition : "none";
    yesBtn.style.transition = state ? transition : "none";
}
//reseting breaks hover
function resetActors() {
    tile.style.transform = "rotate(0deg)";
    noBtn.style.backgroundColor = `rgba(${primaryRGB},0)`;
    noBtn.style.border = `1px solid rgba(${borderRGB},0)`;
    yesBtn.style.backgroundColor = `rgba(${primaryRGB},0)`;
    yesBtn.style.border = `1px solid rgba(${borderRGB},0)`;
}
function highlightButton(movement) {
    const percent = Math.abs(movement / maxDist);
    const button = (movement > 0) ? yesBtn : noBtn;
    button.style.backgroundColor = `rgba(${primaryRGB},${percent})`;
    button.style.border = `1px solid rgba(${borderRGB},${percent})`;
}

function getPosition(e) {
    let x, y = null;
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        let touch = e.touches[0] || e.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        x = e.clientX;
        y = e.clientY;
    }

    return { "x": x, "y": y };
}


document.addEventListener("DOMContentLoaded", onDocumentLoad);
