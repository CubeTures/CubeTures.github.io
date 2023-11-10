import { parseLocation, parseRadius, parseNumResults } from "./NewMatch.js";

function displayDataList(response) {
    const element = document.getElementById("data");
    let output = "";

    for(const result of response["results"]) {
        output += `Name: ${result["name"]}\n&emsp;Address: ${result["location"]["address"]}\n`;
    }

    element.innerHTML = output.replace(/\n/g, '<br />');;
}
function logAndDisplay(response) {
    console.log(response); 
    displayDataList(response);
}

function getOptions() {
    return {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3lxjUahFoEEI93RiMTYz4SXbPNJYOwaKuG5GBaOCprs0='
        }
    };
}
function buildSearchLink(search) {
    //'https://api.foursquare.com/v3/address/fsq_addr_id'
    let link = 'https://api.foursquare.com/v3/places/search';
    if(search) {
        link += "?";
        for(let i = 0; i < search.length; i++) {
            link += `${search[i][0]}=${search[i][1]}`;
            if(i != search.length - 1) {
                link += "&";
            }
        }
    }
    console.log(link);
    return link;    
}
function searchPlaces(search, callback) {
    fetch(buildSearchLink(search), getOptions())
        .then(response => response.json())
        .then(response => callback(response))
        .catch(err => console.error(err));
}


function getAllCategories() {
    let all = "";
    let max = 393;
    for(let i = 0; i < max; i++) {
        let str = "13";
        if(i < 10) {
            str += `00${i}`;
        }
        else if(i < 100) {
            str += `0${i}`;
        }
        else {
            str += `${i}`;
        }
        if(i != max - 1) {
            str += ",";
        }

        all += str;
    }
    return all;
}

function testQuery() {
    let search = [["ll", parseLocation()], ["radius", parseRadius()], ["limit", parseNumResults()], ["categories", "13065"]];
    searchPlaces(search, logAndDisplay);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search")
        .addEventListener("click", testQuery);
});