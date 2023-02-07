callOnLoad(load);
function load() {
    //Set Active
    let path = window.location.pathname;
    let page = path.split("/").pop();
    page = page.substring(0, page.indexOf("."));
    let isClasswork = page == "principles" || page == "data_structures" || page == "independent_studies" || page == "unity";
    let isPersonal = page == "collaborative" || page == "unpublished" || page == "published";

    if(page == "") { page = "index"; }
    else if(isClasswork) { page = "classwork"; }
    else if(isPersonal) { page = "personal"; }
    document.getElementById(page).classList.add('active');


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
    document.querySelector('.switch').addEventListener('click', () => {
        let body = document.body;

        if(body.classList.contains('dark')) {
            body.classList.remove('dark');
        }
        else {
            body.classList.add('dark');
        }
    });
}