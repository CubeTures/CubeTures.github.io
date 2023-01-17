let shadowDensity = 5;
let alpha = "rgba(0, 0, 0, 0)";

document.addEventListener('DOMContentLoaded', () => {
    shadowTop();
    shadowBot();
    spaced();
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
        div.innerHTML = inner + '\n<p>Test</p>';

        div.style = "white-space: break-spaces";

        // let bgTop = "linear-gradient(canvas, ";
        // let bgBot = "linear-gradient(";
        // for(let i = 0; i < len / shadowDensity; i++) {
        //     bgTop += alpha + ", ";
        //     bgBot += alpha + ", ";
        // }
        // bgTop = bgTop.substring(0, bgTop.length - 2) + ")";
        // bgBot = bgBot.substring(0, bgTop.length - 2) + "canvas)";

        // let bg = bgTop + ", " + bgBot;
        // div.style.background = bg;
    }
}

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