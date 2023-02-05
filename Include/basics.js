async function addCss(fileName) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
}
async function addScript(fileName) {
    var head = document.head;
    var link = document.createElement("script");

    link.src = fileName;
    head.appendChild(link);
}
  
addScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js');
addScript('/Include/effects.js');
addScript('/Include/decoration.js');
addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js');
defer();

addCss('/Include/style.css');
addCss('/Include//Header/nav.css');
addCss('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');

async function defer(method) {
    if (window.jQuery) {
        addScript('/Include/Header/header.js');
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}
