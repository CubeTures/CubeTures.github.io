import { filters } from "../Google APIs/google-api.js";
const spaces = 4;

//indeterminate = true
//breadth first search

function setFilters() {
    console.log(bfs(filters, 0));
}
function bfs(obj, depth) {
    const spaceStr = getSpaces(depth);
    if(typeof(obj) == "string") { 
        return `${spaceStr}${obj}\n`; //create checkbox
    }

    let result = ""; //create accordion
    for(const o in obj) {
        const dive = bfs(obj[o], depth + 1);
        result += `${spaceStr}${o}:\n${dive}`;
    }

    return result;
}
function getSpaces(num) {
    let result = "";
    for(let i = 0; i < num; i++) {
        for(let j = 0; j < spaces; j++) {
            result += " ";
        }
    }
    return result;
}

class FilterCheckbox {
    /*  hold parent and children, subscribe to children
        when clicked:
            toggle alll children
            notify parent to check status of all children

        cycle:
            unchecked
            checked
            indeterminate / checked
    */
}

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.getElementsByClassName("indeterminate");
    for(const element of elements) {
        element.indeterminate = true;
    }
})

export default setFilters;