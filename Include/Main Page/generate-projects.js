import { Project } from "/Include/Main Page/project.js";
const projectPath = "../../../Data/Main Page/projects.json";

function onDocumentLoad() {
    prepareProjects();
}

async function prepareProjects() {
    const projects = await fetchProjects();
    
    populateProjects(projects);
}
async function fetchProjects() {
    const response = await fetch(projectPath);
    return response.json();
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
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);