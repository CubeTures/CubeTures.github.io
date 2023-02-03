document.addEventListener('DOMContentLoaded', () => {
    //Menu Hover
    for(let child in document.body.children) {
        console.log(child);
        child.addEventListener('mouseenter', (e) => { onHover(e); });
        child.addEventListener('mouseleave', (e) => { onHover(e); });
    }

    //Light / Dark
    document.getElementById('switch').addEventListener('click', () => {
        let body = document.body;
        let toggle = document.getElementById('switch');

        if(body.classList.contains('dark')) {
            body.classList.remove('dark');
            toggle.classList.remove('switched');
        }
        else {
            body.classList.add('dark');
            toggle.classList.add('switched')
        }
    });
});

function onHover(e) {
    console.log("yes");
}