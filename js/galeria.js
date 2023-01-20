/** React Tres Aventuras
 * 
 *  Este archivo tiene que tomar las fotos y videos de instagram (por el momento el mío) y mostrarlas
 *  en una tira vertical desplazable usando React.js para repetir una plantilla
 */

/* Toda esta seccion esta desactivada hasta que vuelva a intentar conectar con IG

/** hace un pedido HTTP a instagaram y genera la promesa de obtener los datos */
const token = "IGQVJWdUp6NlVrYVM1a0VkS2Q5SFFsS3Q4d0pkQmhkRFI5Q2g3c1gybE5lMi1DY0tfU0d6TkcxMG9yaUhQa3JUWW04SnIwRGthSERGanZA1QzF2WHh1b1dpVV9ZARzZAEWXZATZAmFueDRfOFE5VVF3T28wcgZDZD";
const URL = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=" + token
const pedidoHTTP = fetch(URL).then(extraer).then(generarLista);

/** Convierte los datos en formato JSON */

function extraer(arg) {
    return arg.json();
}

/** Una vez que la promesa se cumple (los datos llegan del servidor de instagram) esta funcion devuelve un objeto JSON
 *  con todos los datos pedidos.
 */
async function generarLista(arg) {
    const listaMedios = await arg.data;
    const listaVideos = listaMedios.filter((medio) => { return medio.media_type == "VIDEO" });
    const listaMiniaturas = listaVideos.map((medio) => { return medio.thumbnail_url });
    const listaElementosGaleria = listaMiniaturas.map(encapsularFoto);
    const cuerpoGaleria = <div className="galeria">{listaElementosGaleria}</div>;

    renderizar(cuerpoGaleria);
}

/*
async function recopilarFotos() {
    const contenido = await fetch("../data/fotos.json");
    const texto = await contenido.text();
    const fotos = JSON.parse(texto);

    const listaElementosGaleria = fotos.map(encapsularFoto);
    const cuerpoGaleria = <div className="galeria">{listaElementosGaleria}</div>;

    renderizar(cuerpoGaleria);
}

recopilarFotos();
*/

function encapsularFoto(url) {
    const imagen = <Imagen url={url}></Imagen>;
    const miniatura = <Tarjeta contenido={imagen}></Tarjeta>;

    return miniatura;
}

function Imagen(props) {
    return <img src={props.url}></img>;
}

function Tarjeta(props) {
    return <div className="tarjeta">{props.contenido}</div>;
}

function renderizar(elemento) {
    const root = ReactDOM.createRoot(document.querySelector(".lienzo"));
    root.render(elemento);

}



