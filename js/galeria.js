/** React Tres Aventuras
 * 
 *  Este archivo tiene que tomar las fotos y videos de instagram (por el momento el mío) y mostrarlas
 *  en una tira vertical desplazable usando React.js para repetir una plantilla
 */

import { Player, ControlBar } from 'video-react';

/** PEDIDO HTTP a instagaram; genera la promesa de obtener los datos */
const token = "IGQVJXeTdTMWEtWWhBZAmVscjNfaDRHVUZAidlpOVkxqWnluUGxXa29DbFlHM0F6ekY0WEV4ZAVo5U3NCOF9BTlozMU40MWxwS1VwOVR4Q1d3bWNpZAy11OGNhcXVGemFTTUFjR0pfY0lacW5GbFhiRHNhQgZDZD";
const URL = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=" + token
const pedidoHTTP = fetch(URL).then(extraer).then(crearPagina);

/** Convierte los datos en formato JSON */
function extraer(arg) {
    return arg.json();
}


/** Una vez que la promesa se cumple (los datos llegan del servidor de instagram) esta funcion devuelve un objeto JSON
 *  con todos los datos pedidos.
 *  En la funcion crearPagina inicializo todos los componentes React que van a formar la pagina ademas de
 *  los datos tomados del pedido HTTP.
 */
async function crearPagina(arg) {
    /* genera la lista de miniaturas */
    const listaMedios = await arg.data;
    const listaVideos = listaMedios.filter((medio) => { return medio.media_type == "VIDEO" });
    const listaElementosGaleria = listaVideos.map(encapsularMiniatura);
    const cuerpoGaleria = <div className="galeria">{listaElementosGaleria}</div>;


    const pagina = <Pagina cuerpoGaleria={cuerpoGaleria}></Pagina>;

    renderizar(pagina);
}


/**
 * Estas tres funciones generan el link al video con la miniatura en una tarjeta.
 * @param {*} video 
 * @returns 
 */
function encapsularMiniatura(video) {
    const imagen = <Imagen url={video.thumbnail_url}></Imagen>;
    const miniatura = <Tarjeta key={video.id} contenido={imagen}></Tarjeta>;

    return <a href={video.media_url}>{miniatura}</a>;
}

function Imagen(props) {
    return <img src={props.url}></img>;
}

function Tarjeta(props) {
    return <div className="tarjeta">{props.contenido}</div>;
}


/** El componente Pagina contiene toda la estructura HTML del documento
 *  la cual se forma anidando llamados a los distintos componentes. 
 */
function Pagina(props) {
    return (
        <div className="mosaico-vertical">
            <Barra></Barra>
            <Lienzo cuerpoGaleria={props.cuerpoGaleria}></Lienzo>
            <Player></Player>
        </div>
    );
}

function Barra() {
    return (
        <ul className="barra">
            <Inicio></Inicio>
            <ExtremoDerecho></ExtremoDerecho>
        </ul>
    );
}

function Inicio() {
    return <a href="./index.html" className="inicio"></a>
}

function ExtremoDerecho() {
    return (
        <div className="extremo-derecho">
            <ul className="nav-links">
                <a href="./viaje.html" class="nav-link">vamos de viaje</a>
                <a href="./galeria.html" class="nav-link nav-resaltado">galeria</a>
                <a href="./quienes.html" class="nav-link">quiénes somos</a>
            </ul>
        </div>
    );
}


function Lienzo(props) {
    return (
        <div className="lienzo">
            {props.cuerpoGaleria}
        </div>
    );
}

function renderizar(elemento) {
    const root = ReactDOM.createRoot(document.querySelector("body"));
    root.render(elemento);
}
