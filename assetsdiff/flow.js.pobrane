
var bar = document.querySelector('.top_slide_bar');
var barOpened = 'top_slide_bar_open';

window.addEventListener("scroll", (event) => {
    var scroll = this.scrollY;
    var classes = bar.classList;

    if (scroll > 100 && !classes.contains(barOpened)){
        classes.add(barOpened);
    }else if (scroll <= 100 && classes.contains(barOpened)){
        classes.remove(barOpened)
    }
});