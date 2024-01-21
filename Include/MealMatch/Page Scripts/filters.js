import { filters } from "../Google APIs/google-api.js";
const spaces = 4;

//indeterminate = true
//breadth first search

function setFilters() {
    //console.log(bfs(filters, 0));
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

function createAccordion(filter, includeCheckboxes=false) {
    const checkboxes = includeCheckboxes ? `<div class="checkboxes"></div>` : "";

    return `
    <div class="accordion accordion--custom">
        <div class="accordion-item" id="${filter}-item">
            <h2 class="accordion-header>
                <input type="checkbox" class="form-check-input no-margin">
                <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#${filter}-collapse-"
                    aria-expanded="true" aria-controls="${filter}-collapse">
                    <p class="m-font">${filter}</p>
                </button>
            <h2>
            <div id="${filter}-collapse"
            class="accordion-collapse collapse" data-bs-parent="#${filter}-item">
                <div class="accordion-body" id="${filter}-dropdown">
                    ${checkboxes}
                <div>
            </div>
        </div>
    </div>
    `;
}
function createCheckbox() {
    //filler
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