function toggleVolumen() {
    const boton = document.querySelector("#boton-mute");
    const video = document.querySelector("#video-incio");

    if (boton.innerHTML == "volume_off") {
        boton.innerHTML = "volume_up";
        video.muted = false;
    } else {
        boton.innerHTML = "volume_off";
        video.muted = true;
    }
}

function navegar(e) {
    const actual = document.querySelector(".nav-link.secundario");
    const link = e.currentTarget;
    const objetivo = document.querySelector("#" + link.dataset.target);
    const menu = document.querySelector(".navbar-collapse");

    menu.classList.remove("show");

    if (actual !== null) {
        actual.classList.remove("secundario");
    }
    
    link.classList.add("secundario");
    objetivo.scrollIntoView();
}