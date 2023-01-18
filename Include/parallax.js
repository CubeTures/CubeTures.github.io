document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', function(){
        let y = window.scrollY;
        let elements = document.getElementsByClassName('parallax-y');

        for(let i = 0; i < elements.length; i++) {
            elem = elements.item(i);
            elem.style.top = y * .25 + 'px';
        }
    });
});