function toggleVolumen() {
    const icono = document.querySelector("#boton-mute .bi");
    const video = document.querySelector("#video-incio");

    icono.classList.toggle("bi-volume-mute-fill");
    icono.classList.toggle("bi-volume-up-fill");

    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
}

function navegar(e) {
    const actual = document.querySelector(".nav-item.secundario");
    const link = e.currentTarget;
    const objetivo = document.querySelector("#" + link.dataset.target);
    const menu = document.querySelector(".navbar-collapse");

    menu.classList.remove("show");

    if (actual !== null) {
        actual.classList.remove("secundario");
    }
    
    if (link.dataset.target!="landing") {
        link.parentElement.classList.add("secundario");
    }

    objetivo.scrollIntoView();
}