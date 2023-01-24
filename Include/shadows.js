let shadowDensity = 5;
let alpha = "rgba(0, 0, 0, 0)";

document.addEventListener('DOMContentLoaded', () => {
    shadowTop();
    shadowBot();
});

function shadowTop() {
    let divs = document.getElementsByClassName('shadow-top');
    for(let x = 0; x < divs.length; x++) {
        let div = divs.item(x);
        div.style.background = 'linear-gradient(canvas, ' + alpha + ')';
        div.innerHTML = "ㅤ";
    }
}
function shadowBot() {
    let divs = document.getElementsByClassName('shadow-bot');
    for(let x = 0; x < divs.length; x++) {
        let div = divs.item(x);
        div.style.background = 'linear-gradient(' + alpha + ', canvas)';
        div.innerHTML = "ㅤ";
    }
}
