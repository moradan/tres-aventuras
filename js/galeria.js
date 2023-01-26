/** React Tres Aventuras
 * 
 *  Este archivo tiene que tomar las fotos y videos de instagram (por el momento el mío) y mostrarlas
 *  en una tira vertical desplazable usando React.js para repetir una plantilla
*/

/** PEDIDO HTTP a instagaram; genera la promesa de obtener los datos */
const token = "IGQVJXeTdTMWEtWWhBZAmVscjNfaDRHVUZAidlpOVkxqWnluUGxXa29DbFlHM0F6ekY0WEV4ZAVo5U3NCOF9BTlozMU40MWxwS1VwOVR4Q1d3bWNpZAy11OGNhcXVGemFTTUFjR0pfY0lacW5GbFhiRHNhQgZDZD";
const URL = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=" + token
const pedidoHTTP = fetch(URL);

renderizar(<Pagina></Pagina>);

/** El componente Pagina contiene toda la estructura HTML del documento
 *  la cual se forma anidando llamados a los distintos componentes. 
*/
function Pagina() {
    /* defino el estado de la pagina que incluye la lista de medios y el estado del reproductor */
    return (
        <div className="mosaico-vertical">
            <Barra></Barra>
            <Contenido></Contenido>
        </div>
    );
}

/** Barra de navegacion
 * 
 * 
 */
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
                <a href="./viaje.html" className="nav-link">vamos de viaje</a>
                <a href="./galeria.html" className="nav-link nav-resaltado">galeria</a>
                <a href="./quienes.html" className="nav-link">quiénes somos</a>
            </ul>
        </div>
    );
}


/** Contenido de la galeria */
function Contenido() {
    const [reproductorVisible, setReproductorVisible] = React.useState("invisible");
    const [listaVideos, setListaVideos] = React.useState([]);

    React.useEffect(() => {
        pedidoHTTP
            .then((respuesta) => respuesta.json())
            .then((contenido) => contenido.data)
            .then((listaMedios) => {
                setListaVideos(
                    listaMedios.filter((medio) => medio.media_type == 'VIDEO')
                )
            });
    }, []);


    if (listaVideos.length == 0) {
        const dummies = [, , ,];
        const listaElementosGaleria = dummies.map(encapsularMiniatura);
        const cuerpoGaleria = <div className="galeria">{listaElementosGaleria}</div>;

        return (
            <div className="mosaico-vertical">
                <Lienzo cuerpoGaleria={cuerpoGaleria}></Lienzo>
            </div>
        );
    } else {
        const listaElementosGaleria = listaVideos.map(encapsularMiniatura);
        const cuerpoGaleria = <div className="galeria">{listaElementosGaleria}</div>;
        return (
            <div className="mosaico-vertical">
                <Lienzo cuerpoGaleria={cuerpoGaleria}></Lienzo>
                <Player visible={reproductorVisible}></Player>
            </div>
        );
    }
}

/** Estas tres funciones generan el link al video con la miniatura en una tarjeta.*/
function encapsularMiniatura(video) {
    const imagen = <Imagen url={video.thumbnail_url}></Imagen>;
    const miniatura = <Tarjeta contenido={imagen}></Tarjeta>;

    if (video == null) {
        return <a></a>
    } else {
        return <a key={video.id}>{miniatura}</a>;
    }
}

function Imagen(props) {
    return <img src={props.url}></img>;
}

function Tarjeta(props) {
    return <div className="tarjeta">{props.contenido}</div>;
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
