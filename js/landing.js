function toggleVolumen() {
    
    if (document.getElementById("boton-mute").innerHTML == "volume_off") {
        document.getElementById("boton-mute").innerHTML = "volume_up";
        document.getElementById("video-inicio").muted = false;
    } else {
        document.getElementById("boton-mute").innerHTML = "volume_off";
        document.getElementById("video-inicio").muted = true;
    }
}