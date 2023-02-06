async function addCss(fileName) {
    let head = document.head;
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
}
async function addScript(fileName) {
    let head = document.head;
    let link = document.createElement("script");

    link.src = fileName;
    head.appendChild(link);
}
  
await addScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js');
await addCss('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
await addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js');

await addCss('/Include/style.css');
await addCss('/Include//Header/nav.css');

await addScript('/Include/effects.js');
await addScript('/Include/decoration.js');
await addScript('/Include/text_insert.js');
await defer();



async function defer(method) {
    if (window.jQuery) {
        addScript('/Include/Header/header.js');
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}
