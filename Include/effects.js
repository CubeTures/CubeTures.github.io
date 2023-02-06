let expanded = null;
let screenSize = 1920 / 2;

console.log("effects");
console.log("state: " + document.readyState);
if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
    load();
}
else {
    document.addEventListener('DOMContentLoaded', () => { 
        load(); 
    });
}
function load() {
    console.log('effects.js started');
    resize();
    spaced();
    absoluteCenter();
    //to do: if width is larger than 50 / 75 % then remove vh, re-add expandable
    setClamps();

    window.addEventListener('resize', resize);
};

function spaced() {
    let divs = document.getElementsByClassName('spaced');
        console.log('divs got by spaced: ' + divs);
        for(let x = 0; x < divs.length; x++) {
            let div = divs.item(x);
            let len = parseInt(div.innerHTML);
            console.log('div ' + x + " " + div);

            let inner = "";
            for(let i = 0; i < len; i++) {
                inner += '\n';
            }
            div.innerHTML = inner;

            div.style = "white-space: break-spaces";
        }
}

function absoluteCenter() {
    let divs = document.getElementsByClassName('absolute-center');
    for(let x = 0; x < divs.length; x++) {
        let div = divs.item(x);

        let parent = div.parentNode;
        let wrapper = document.createElement('div');
        wrapper.classList += 'row ';
        parent.replaceChild(wrapper, div);

        let smaller = document.createElement('div');
        smaller.classList += 'col ';
        smaller.classList += 'text-center '
        wrapper.appendChild(smaller);

        smaller.appendChild(div);
    }
}

function setClamps() {
    Promise.all(Array.from(document.images).map(img => {
        if (img.complete) {
            clampHeight(img);
            return Promise.resolve(img.naturalHeight !== 0);
        }
            
        return new Promise(resolve => {
            img.addEventListener('load', () => resolve(true));
            img.addEventListener('load', () => { clampHeight(img); });
            img.addEventListener('error', () => resolve(false));
        });
    })).then(results => {
        if (results.every(res => res)) { 
            //console.log('all images loaded successfully'); 
        }
        else { 
            //console.log('some images failed to load, all finished loading'); 
        }
    });
}
function clampHeight(elem) {
    let calculatedHeight = Math.round(elem.width * elem.naturalHeight / elem.naturalWidth);
    if(calculatedHeight > window.visualViewport.height / 2) {
        if(elem.classList.contains('w-50')) { elem.classList.remove('w-50'); }
        if(elem.classList.contains('w-75')) { elem.classList.remove('w-75'); }
        if(elem.classList.contains('expandable')) { elem.classList.remove('expandable'); }
        elem.style = "height: 50vh; width: auto";
    }
}

function resize() {
    if(window.innerWidth <= screenSize && (expanded === null || expanded)) {
        expandable(true);
        expandableReverse(true);
        expandableContainer(true);
        expanded = false;
    }
    else if(window.innerWidth > screenSize && (expanded === null || !expanded)) {
        expandable(false);
        expandableReverse(false);
        expandableContainer(false);
        expanded = true;
    }
}
function expandable(isSmall) {
    let elements = document.getElementsByClassName('expandable');
    
    if(isSmall) {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);

            if(elem.classList.contains('w-50')) { elem.classList.remove('w-50'); }
            elem.classList.add('w-75');
        }
    }
    else {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);

            if(elem.classList.contains('w-75')) { elem.classList.remove('w-75'); }
            elem.classList.add('w-50');
        }
    }
}
function expandableReverse(isSmall) {
    let elements = document.getElementsByClassName('expandable-r');
    
    if(isSmall) {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);

            if(elem.classList.contains('w-75')) { elem.classList.remove('w-75'); }
            elem.classList.add('w-50');
        }
    }
    else {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);

            if(elem.classList.contains('w-50')) { elem.classList.remove('w-50'); }
            elem.classList.add('w-75');
        }
    }
}
function expandableContainer(isSmall) {
    let elements = document.getElementsByClassName('expandable-c');

    if(isSmall) {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);

            if(elem.classList.contains('container')) { elem.classList.remove('container'); }
            if(elem.classList.contains('rounded-4')) { elem.classList.remove('rounded-4'); }
            elem.classList.add('container-fluid');
        }
    }
    else {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);
            
            if(elem.classList.contains('container-fluid')) { elem.classList.remove('container-fluid'); }
            elem.classList.add('rounded-4');
            elem.classList.add('container');
        }
    }
}

