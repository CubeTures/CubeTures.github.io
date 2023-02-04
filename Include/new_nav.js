document.addEventListener('DOMContentLoaded', () => {
    //Menu on Hover
    $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
        //768
        if($(window).width() > 768) {
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
        }
    });

    //Light / Dark Theme
    document.querySelector('.logo').addEventListener('click', () => {
        let body = document.body;

        if(body.classList.contains('dark')) {
            body.classList.remove('dark');
        }
        else {
            body.classList.add('dark');
        }
    });
});