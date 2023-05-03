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
    const DESPLAZADO = 7 * REM;
    
    const itemsNavegacion = document.querySelectorAll(".nav-item");
    const destinosNavegacion = document.querySelectorAll(".destino-nav");

    let cantidadDestinos = destinosNavegacion.length;
    let destinoActual = 0;

    while(destinoActual < cantidadDestinos && destinosNavegacion[destinoActual].offsetTop + DESPLAZADO < window.scrollY) {
        destinoActual++;
    }

    for (const item of itemsNavegacion) {
        item.classList.remove("secundario");
    }

    if (destinoActual > 0) {
        itemsNavegacion[destinoActual - 1].classList.add("secundario");
    }
}

activarMenu();
window.addEventListener("scroll", activarMenu);