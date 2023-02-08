function callOnLoad(funct) {
    if (document.readyState !== "loading") {
        funct();
    }
    else {
        document.addEventListener('DOMContentLoaded', () => { funct(); });
    }
}


function addCss(fileName) {
    let head = document.head;
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
}
function addScript(fileName) {
    let head = document.head;
    let link = document.createElement("script");

    link.src = fileName;
    head.appendChild(link);
}
function addIcon(fileName) {
    let head = document.head;
    let link = document.createElement("link");

    link.type = "image/svg";
    link.rel = "icon";
    link.href = fileName;

    head.appendChild(link);
}

callOnLoad(setTheme);
addIcon('/Images/Backed.svg?');
addScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js');
addCss('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js');

addCss('/Include/style.css');

addScript('/Include/effects.js');
addScript('/Include/decoration.js');
addScript('/Include/text_insert.js');
defer();


async function defer(method) {
    if (window.jQuery) {
        addScript('/Include/Header/header.js');
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}

function setTheme() {
    //local, if no then preference, save
    console.log("[" + localStorage.getItem("theme") + "]");

    let theme = localStorage.getItem("theme");
    if(theme) {
        if(theme == 'dark') {
            //console.log('loading dark theme from local');
            dark();
        }
        else {
            //console.log('loading light theme from local');
            light();
        }
    }
    else if (window.matchMedia) {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            //console.log('no local, loading dark them from preferences');
            dark();
        } 
        else {
            //console.log('no local, loading light them from preferences');
            light();
        }
    } 
    else {
        //console.log('no local, no preferences, loading dark by default');
        dark();
    }
}
function dark() {
    localStorage.setItem("theme", "dark");
    document.body.classList.add('dark');
    setTimeout(() => { document.body.style.transition = ""; }, 100);
}
function light() {
    localStorage.setItem("theme", "light");
    if(document.body.classList.contains('dark')) { document.body.classList.remove('dark'); }
    setTimeout(() => { document.body.style.transition = ""; }, 100);
}

