document.addEventListener('DOMContentLoaded', () => {

    rotateLeft();
    rotateRight();
    screenLeft();
    screenRight();
    
});

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

function moveParallax() {
    let y = window.scrollY;
        let elements = document.getElementsByClassName('parallax-y');

        for(let i = 0; i < elements.length; i++) {
            elem = elements.item(i);
            elem.style.top = y * .1 + 'px';
        }
}