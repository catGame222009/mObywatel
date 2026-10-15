
var error = document.querySelector(".error");

document.querySelectorAll(".action").forEach((element) => {
    element.addEventListener('click', () => {
        error.classList.add("error_open");
    });
});

document.querySelectorAll(".close").forEach((element) => {
    element.addEventListener('click', () => {
        error.classList.remove("error_open");
    })
})