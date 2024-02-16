import { Filter, Project } from "/Include/Main Page/project.js";
const projectPath = "../../../Data/Main Page/projects.json";

function onDocumentLoad() {
    prepareProjects();
}

async function prepareProjects() {
    const json = await fetchProjects();
    console.log(json);
    const filters = json["Filters"];
    const projects = json["Projects"];
    
    populateProjects(projects);
    populateFilters(filters);
}
async function fetchProjects() {
    const response = await fetch(projectPath);
    return response.json();
}
function populateFilters(filters) {
    //const filterButtonTempalte = document.getElementById("filter-button-template")
}
function populateProjects(projects) {
    let projectObjects = [];
    const template = document.getElementById("project-template");
    const parent = document.getElementById("projects");
    
    for(const [ name, options ] of Object.entries(projects)) {
        const projectObj = new Project(name, options);
        const html = projectObj.createHTML(template);
        parent.append(html);
        projectObjects.push(projectObj);
    }
    // projects
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);