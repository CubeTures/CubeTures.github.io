document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('scroll', function(){
        let y = window.scrollY;
        let elements = document.getElementsByClassName('parallax-y');

        for(let i = 0; i < elements.length; i++) {
            elem = elements.item(i);
            elem.style.top = y * .25 + 'px';
        }
    });

    rotateRight();
    screenLeft();
});

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