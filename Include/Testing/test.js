let header, content, footer;

function onContentLoad() {
    header = document.getElementById("header");
    content = document.getElementById("content");
    footer = document.getElementById("footer");

    header.addEventListener("click", expand);
}

function expand() {
    if(header.classList.contains("expand")) {
        header.classList.remove("expand");
        content.classList.remove("shrink");
    }
    else {
        header.classList.add("expand");
        content.classList.add("shrink");
    }
}

document.addEventListener("DOMContentLoaded", onContentLoad);