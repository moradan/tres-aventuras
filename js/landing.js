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

/**
 * Esta funciona normalmente apuntaria a los nav-link dentro de los nav-item; sin embargo en esta pagina use la clase 'secundario' en el nav-item para resaltar el link activo. Esta funcion esta modificada para listar los nav-item en vez de los nav-link. Y cambie el uso de la clase active (propia de bootstrap) por 'secundario' propia de mi hoja de estilos.
 */
function activarMenu() {
    const REM = 16;
    const DESPLAZADO = 15 * REM;
    
    const linksNavegacion = document.querySelectorAll(".nav-item");
    const destinosNavegacion = document.querySelectorAll(".destino-nav");
    const quiebresY = [];

    for (const destino of destinosNavegacion) {
        const quiebreY = destino.offsetTop - DESPLAZADO;
        quiebresY.push(quiebreY);
    }
    
    let seccion = 0;
    while (scrollY >= quiebresY[seccion + 1]) {
        seccion++;
    }

    for (const link of linksNavegacion) {
        link.classList.remove("secundario");
    }

    if (seccion > 0) {
        linksNavegacion[seccion - 1].classList.add("secundario");
    }
}

activarMenu();
window.addEventListener("scroll", activarMenu);