/** React Tres Aventuras
 * 
 *  Este archivo tiene que tomar los videos de instagram (por el momento el mío) y mostrarlas
 *  en una galeria flexible desplazable usando React.js para repetir una plantilla
*/

// inicio la lectura asincronica del archivo que contiene info sobre los medios en la cuenta de IG
const leerGaleria = fetch('/media').then((data) => { return data.json() });

// aqui comienza la construccion de la estructura HTML
renderizar(<Pagina></Pagina>);

/** El componente Pagina contiene toda la estructura HTML del documento
 *  la cual se forma anidando llamados a los distintos componentes. 
*/
function Pagina() {
    return (
        <div className="mosaico-vertical">
            <Barra></Barra>
            <Contenido></Contenido>
        </div>
    );
}

/* Barra de navegacion */
function Barra() {
    return (
        <ul className="barra">
            <Inicio></Inicio>
            <ExtremoDerecho></ExtremoDerecho>
        </ul>
    );
}

/* link de inicio */
function Inicio() {
    return <a href="./index.html" className="inicio"></a>
}

/* contenedor para el extremo derecho que contiene los demas links de navegacion 
    TODO: esta funcion deberia leer el earchivo ../data/barra.json y obtener
    de ahi cada link. la lista de links deberia generarse dinamicamente.
*/
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
    const [reproductorUrl, setReproductorUrl] = React.useState("");
    const [listaVideos, setListaVideos] = React.useState([]);

    React.useEffect(() => {
        leerGaleria.then((res) => { console.log(res) })
    }, []);

    let listaElementosGaleria;
    if (listaVideos.length == 0) {
        const dummies = [, , ,];
        listaElementosGaleria = dummies.map(encapsularMiniatura);
    } else {
        listaElementosGaleria = listaVideos.map((video) => encapsularMiniatura(video, abrirReproductor));
    }

    const cuerpoGaleria = <div className="galeria">{listaElementosGaleria}</div>;

    return (
        <div className="mosaico-vertical">
            <Lienzo cuerpoGaleria={cuerpoGaleria}></Lienzo>
            <Player url={reproductorUrl} visible={reproductorVisible} cerrar={cerrarReproductor}></Player>
        </div>
    );

    function abrirReproductor(e) {
        setReproductorUrl(e.currentTarget.dataset.url);
        setReproductorVisible("visible");
    }

    function cerrarReproductor() {
        setReproductorVisible("invisible");
    }
}

/** Estas tres funciones generan el link al video con la miniatura en una tarjeta.*/
function encapsularMiniatura(video, abrirReproductor) {
    const imagen = <Imagen url={video.thumbnail_url}></Imagen>;
    const miniatura = <Tarjeta contenido={imagen}></Tarjeta>;

    if (video == null) {
        return <a></a>
    } else {
        return <a key={video.id} onClick={abrirReproductor} data-url={video.media_url}>{miniatura}</a>;
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
    const root = ReactDOM.createRoot(document.querySelector(".root"));
    root.render(elemento);
}
