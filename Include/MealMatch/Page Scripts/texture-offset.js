const className = "food-texture";

function onContentLoad() {
    const elements = document.getElementsByClassName(className);

    console.log(elements);
    for(const element of elements) {
        console.log(element);
        const x = getRandomInt(140);
        const y = getRandomInt(140);
        element.style.backgroundPosition = `${x}px ${y}px`;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

document.addEventListener("DOMContentLoaded", onContentLoad);