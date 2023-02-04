document.addEventListener('DOMContentLoaded', () => {
    //Menu on Hover
    document.body.addEventListener('mouseenter', (e) => { onHover(e); });
    document.body.addEventListener('mouseleave', (e) => { onHover(e); });

    //Light / Dark Theme
    document.getElementById('switch').addEventListener('click', () => {
        let body = document.body;
        let toggle = document.getElementById('switch');
        let light = document.getElementById('logo-light');
        let dark = document.getElementById('logo-dark');

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
    $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
        var _d = e.target.closest('.nav-item');
        _d.classList.add('show');
        setTimeout(() => {
            if(_d.matches(':hover')) {
                _d.classList.add('show');
            }
            else {
                _d.classList.remove('show');
            }
        }, 1);
    });
}