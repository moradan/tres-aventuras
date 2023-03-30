function toggleVolumen() {
    
    if (document.getElementById("boton-mute").innerHTML == "volume_off") {
        document.getElementById("boton-mute").innerHTML = "volume_up";
        document.getElementById("video-inicio").muted = false;
    } else {
        document.getElementById("boton-mute").innerHTML = "volume_off";
        document.getElementById("video-inicio").muted = true;
    }
}

function navegar(e) {
    const actual = document.querySelector(".nav-link.secundario");
    const link = e.currentTarget;
    /*
    const objetivo = document.querySelector("#" + link.dataset.target);
    */

    if (actual !== null) {
        actual.classList.remove("secundario");
    }
    
    link.classList.add("secundario");

    /* 
    objetivo.scrollIntoView();
    */
}