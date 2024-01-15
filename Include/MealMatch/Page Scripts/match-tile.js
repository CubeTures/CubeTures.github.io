import { Stack } from "../../Miscellaneous/Data Collections.js";
const primaryRGB = "251,70,112", borderRGB = "249,190,203";
let stack = new Stack();
let yesBtn, noBtn, maxDist, tolerance;
const weekdayAbrv = { 
    "Monday": "M",
    "Tuesday": "T",
    "Wednesday": "W",
    "Thursday": "R",
    "Friday": "F",
    "Saturday": "S",
    "Sunday": "U"
};

function onDocumentLoad() {
    setWidths();
}
function setWidths() {
    const width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
    maxDist = width / 3;
    tolerance = width / 9;
}

export default class MatchTile {
    constructor(clone, id, location, decisionCallback) {
        this.setVariables(clone, id, decisionCallback);
        this.addToStack();
        this.setInfo(clone, location);
        this.setExtra(clone, location);
        this.setPhotos(clone, location);
        this.setActions(clone);
    }

    setVariables(clone, id, decisionCallback) {
        this.tile = clone.querySelector("#tile");
        this.id = id;
        this.decisionCallback = decisionCallback;
        this.startDragAnon = (e) => this.startDrag(e);
        this.dragTileAnon = (e) => this.dragTile(e);
        this.stopDragAnon = (e) => this.stopDrag(e);

        if(!yesBtn) {
           yesBtn = document.getElementById("yes");
        }
        if(!noBtn) {
            noBtn = document.getElementById("no");
        }
    }
    addToStack() {
        stack.push(this.id);
    }
    removeFromStack() {
        if(this.id == stack.peek()) {
            stack.pop();
        }
    }
    setInfo(clone, location) {
        const name = clone.querySelector("#name");
        name.textContent = location["name"];
    
        const category = clone.querySelector("#category");
        category.textContent = location["category"];
    
        const price = clone.querySelector("#price");
        price.textContent = this.parsePriceLevel(location["price"]);
    
        const distance = clone.querySelector("#distance");
        distance.textContent = this.formatDistance(location["distance"]);
    }
    setExtra(clone, location) {
        const name = clone.querySelector("#name-backup");
        name.textContent = location["name"];

        const address = clone.querySelector("#address");
        address.textContent = location["address"];
        address.setAttribute("href", location["maps"]);
    
        const website = clone.querySelector("#website");
        website.textContent = this.getWebsiteText(location["website"]);
        website.setAttribute("href", location["website"]);
    
        const phone = clone.querySelector("#phone");
        phone.textContent = location["phone"];
        phone.setAttribute("href", this.getPhoneHref(location["phone"]));
    
        const rating = clone.querySelector("#rating");
        rating.textContent = this.formatRating(location["rating"]);
    
        const hours = clone.querySelector("#hours");
        const hoursArray = location["hours"].split(",");
        hours.innerHTML = this.getHoursTable(hoursArray);
    }
    setPhotos(clone, location) {
        const classes = "class='match-image rounded bordered'";
        const photoDiv = clone.getElementById("photos");
    
        const photos = location["photos"];
        if(photos) {
            let html = "";
            for(const photo in photos) {
                let url = photo.replaceAll(",", ".");
                url = url.replaceAll("|", "/");
                html += `<img ${classes} src=${url}>`;
            }
    
            photoDiv.innerHTML = html;
        }
        
    }

    setActions(clone) {
        this.setSwitch(clone);
        this.setStartDrag(true);
    }

    setSwitch(clone) {
        const info = clone.querySelector("#info");
        this.extra = clone.querySelector("#extra");
        info.addEventListener("click", () => { 
            this.switchDisplay(this.extra);
        });
    }
    switchDisplay(extra) {
        if(extra.classList.contains("extra-box-alt")) {
            extra.classList.remove("extra-box-alt");
        }
        else {
            extra.classList.add("extra-box-alt");
        }
    }

    setStartDrag(state) {
        if(state) {
            this.tile.addEventListener("mousedown", this.startDragAnon);
            this.tile.addEventListener("touchstart", this.startDragAnon);
        }
        else {
            this.tile.removeEventListener("mousedown", this.startDragAnon);
            this.tile.removeEventListener("touchstart", this.startDragAnon);
        }        
    }
    
    parsePriceLevel(price) {
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
    formatDistance(distance) {
        const number = parseFloat(distance);
        const rounded = number.toFixed(1);
        const s = (rounded == "1.0") ? "" : "s";
        return `${rounded} Mile${s} Away`;
    }
    
    getWebsiteText(urlStr) {
        const url = new URL(urlStr);
        return url.hostname;
    }
    getPhoneHref(phone) {
        return `tel:${phone.replace(/[^0-9]+/g, '')}`;
    }
    formatRating(rating) {
        return `${rating}/5`;
    }
    
    getHoursTable(hoursArray) {
        const head = this.getHoursHead();
        
        let body = "";
        for(const hour of hoursArray) {
            body += this.getHoursBody(hour);
        }
    
        return ""+
            `<table class="table table-dark table-borderless no-margin">
                ${head}
                <tbody class="top-border">${body}</tbody>
            </table>`;
    }
    getHoursHead() {
        return ""+
        `<thead>
            <tr>
                <th scope="col">Day</th>
                <th scope="col">Open</th>
                <th scope="col">Close</th>
            </tr>
        </thead>`;
    }
    getHoursBody(hour) {
        const parse = this.parseHour(hour);
        const { day, open, close } = parse;
    
        if(close) {
            return ""+
            `<tr>
                <td scope="row">${day}</td>
                <td>${open}</td>
                <td>${close}</td>
            </tr>`;
        }
        else {
            return ""+
            `<tr>
                <td scope="row">${day}</td>
                <td colspan="2">${open}</td>
            </tr>`;
        }
        
    }
    parseHour(hour) {
        const firstColon = hour.indexOf(":");
        const day = hour.substring(0, firstColon);
        const times = hour.substring(firstColon + 1).trim();
        const [ open, close ] = this.parseTime(times);
    
        return {
            "day": weekdayAbrv[day],
            "open": open,
            "close": close
        };
    }
    parseTime(times) {
        const cleaned = times.replace(/\s+/g, '');
        const [ openFull, closeFull ] = cleaned.split("–");
    
        if(!closeFull) {
            if(openFull == "Open24hours") {
                return [ "Open 24 Hours", null ];
            } 
    
            return [ openFull, null ];
        }
    
        let open = "-", close = "-";
        if(openFull && this.isNumeric(openFull.substring(0, 1))) {
            open = this.get24Hour(openFull);
        }
        if(closeFull && this.isNumeric(closeFull.substring(0, 1))) {
            close = this.get24Hour(closeFull);
        }
    
        return [ open, close ]; 
    }
    isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }
    get24Hour(time) {
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

    startDrag(e) {
        if(this.id == stack.peek()) {
            const { x } = this.getPosition(e);
            this.startX = x;
            this.setTransitions(false);
            
            document.addEventListener("mousemove", this.dragTileAnon);
            document.addEventListener("touchmove", this.dragTileAnon);
            document.addEventListener("mouseup", this.stopDragAnon);
            document.addEventListener("touchend", this.stopDragAnon);
            document.addEventListener("touchcancel", this.stopDragAnon);
        }
        else {
            this.setStartDrag(false);
        }
    }
    dragTile(e) {
        if(!this.startX) { return; }
        e.preventDefault();
        const { x } = this.getPosition(e);
        const offsetX = x - this.startX;
    
        if(offsetX > tolerance || offsetX < -tolerance) {
            let movement = (offsetX - (offsetX > 0 ? tolerance : -tolerance));
            this.highlightButton(movement);
            this.tile.style.transform = `translate(${movement}px, 0px)`;
        }
    }
    stopDrag(e) {
        const [ complete, decision ] = this.decisionMade(e);
        if(complete) {
            this.endDecision(decision);
        }

        this.startX = null;
        document.removeEventListener("mousemove", this.dragTileAnon);
        document.removeEventListener("touchmove", this.dragTileAnon);
        document.removeEventListener("mouseup", this.stopDragAnon);
        document.removeEventListener("touchend", this.stopDragAnon);
        document.removeEventListener("touchcancel", this.stopDragAnon);
        this.setTransitions(true);
        this.resetActors();
    }
    decisionMade(e) {
        const { x } = this.getPosition(e);
        const offsetX = x - this.startX;
        const trueOffset = Math.abs(offsetX) - tolerance;
        return [ trueOffset > maxDist, offsetX > 0 ]; 
    }   
    endDecision(decision) {
        const direction = decision ? "right" : "left";
        this.tile.classList.add(`offscreen-${direction}`);
        this.removeFromStack()        
        this.decisionCallback(decision);
    }
    
    setTransitions(state) {
        const transition = "all .3s ease-out";
        this.tile.style.transition = state ? transition : "none";
        noBtn.style.transition = state ? transition : "none";
        yesBtn.style.transition = state ? transition : "none";
    }
    resetActors() {
        this.tile.style.transform = "translate(0px)";
        noBtn.style.backgroundColor = null;
        noBtn.style.border = null;
        yesBtn.style.backgroundColor = null;
        yesBtn.style.border = null;
    }
    highlightButton(movement) {
        const percent = Math.abs(movement / maxDist);
        const button = (movement > 0) ? yesBtn : noBtn;
        button.style.backgroundColor = `rgba(${primaryRGB},${percent})`;
        button.style.border = `1px solid rgba(${borderRGB},${percent})`;
    }
    
    getPosition(e) {
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
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);