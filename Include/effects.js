let expanded = null;
let screenSize = 1920 / 2;
document.addEventListener('DOMContentLoaded', () => {
    resize();
    spaced();
    absoluteCenter();

    rotateLeft();
    rotateRight();
    screenLeft();
    screenRight();

    window.addEventListener('scroll', moveParallax);
    window.addEventListener('resize', resize);
});

function spaced() {
    let divs = document.getElementsByClassName('spaced');
    for(let x = 0; x < divs.length; x++) {
        let div = divs.item(x);
        let len = parseInt(div.innerHTML);

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

function moveParallax() {
    let y = window.scrollY;
        let elements = document.getElementsByClassName('parallax-y');

        for(let i = 0; i < elements.length; i++) {
            elem = elements.item(i);
            elem.style.top = y * .1 + 'px';
        }
}

function rotateLeft() {
    let elements = document.getElementsByClassName('rotate-left');
    for(let x = 0; x < elements.length; x++) {
        let elem = elements.item(x);

        elem.style = "rotate: -75deg"
    }
}
function rotateRight() {
    let elements = document.getElementsByClassName('rotate-right');
    for(let x = 0; x < elements.length; x++) {
        let elem = elements.item(x);

        elem.style = "rotate: 25deg"
    }
}

function screenLeft() {
    let elements = document.getElementsByClassName('screen-left');
    for(let x = 0; x < elements.length; x++) {
        let elem = elements.item(x);

        elem.style = "left: -20%;"
    }
}
function screenRight() {
    let elements = document.getElementsByClassName('screen-right');
    for(let x = 0; x < elements.length; x++) {
        let elem = elements.item(x);

        elem.style = "right: -10%;"
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
            elem.classList.add('container-fluid');
        }
    }
    else {
        for(let x = 0; x < elements.length; x++) {
            let elem = elements.item(x);
            
            if(elem.classList.contains('container-fluid')) { elem.classList.remove('container-fluid'); }
            elem.classList.add('container');
        }
    }
}

