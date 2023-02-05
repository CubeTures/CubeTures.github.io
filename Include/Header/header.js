$('#app-header').load('/Include/Header/nav.html#insert');

//appear on scroll
document.addEventListener('DOMContentLoaded', () => {
    let prevScroll = window.pageYOffset;
    let lowestScroll = window.pageYOffset;

    document.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset;

        if(prevScroll < currentScroll) {
            document.querySelector(".navbar").style.top = "-100px";
            lowestScroll = currentScroll;
        }
        else if(lowestScroll - 100 > currentScroll || currentScroll <= 20) {
            document.querySelector(".navbar").style.top = "0";
        }
        else {
            document.querySelector(".navbar").style.top = "-100px";
        }

        prevScroll = currentScroll;
        if(lowestScroll < currentScroll) { lowestScroll = currentScroll; }
    });
});