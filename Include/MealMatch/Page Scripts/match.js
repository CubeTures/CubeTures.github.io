import { getDisplayName } from "../Firebase/firebase-database.js";
let tile, photos, info, extra;
let noBtn, yesBtn;
let startX;
const maxDegree = 30;
const primaryRGB = "251,70,112", borderRGB = "249,190,203";
let expanded = false;

let id;
let display;

function onDocumentLoad() {
    setID();
    displayName();

    setTile();
    setExpand();
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

async function displayName() {
    display = document.getElementById("display");
    
    const name = await getDisplayName(id);
    display.textContent = `Displaying match created by ${name}.`;
}

function setTile() {
    tile = document.getElementById("tile");
    noBtn = document.getElementById("no");
    yesBtn = document.getElementById("yes");

    tile.addEventListener("mousedown", e => startDragTile(e));
    tile.addEventListener("touchstart", e => startDragTile(e));

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
    
    let rot = offsetX / 3;
    if(rot < 0) { rot = Math.max(-maxDegree, rot); }
    else { rot = Math.min(maxDegree, rot); }
    highlightButton(rot);
    tile.style.transform = `rotate(${rot}deg)`;
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
function resetActors() {
    tile.style.transform = "rotate(0deg)";
    noBtn.style.backgroundColor = `rgba(${primaryRGB},0)`;
    noBtn.style.border = `1px solid rgba(${borderRGB},0)`;
    yesBtn.style.backgroundColor = `rgba(${primaryRGB},0)`;
    yesBtn.style.border = `1px solid rgba(${borderRGB},0)`;
}
function highlightButton(rot) {
    const percent = Math.abs(rot / maxDegree);
    const button = (rot > 0) ? yesBtn : noBtn;
    button.style.backgroundColor = `rgba(${primaryRGB},${percent/6*5})`;
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

function setExpand() {
    photos = document.getElementById("photos");
    info = document.getElementById("info");
    extra = document.getElementById("extra");
    
    info.addEventListener("click", expand);
}
function expand() {
    if(expanded) {
        extra.classList.remove("extra-box-alt");
    }
    else {
        extra.classList.add("extra-box-alt");
    }

    expanded = !expanded;
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);
