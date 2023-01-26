function Player(props) {
    const [url, setUrl] = React.useState(props.url);
    const [visible, setVisible] = React.useState(props.visible);

    return (
        <div className={`cortina ${visible}`}>
            <div className="boton-cerrar on-surface">X</div>
            <video className="reproductor" controls>
                <source src={url}></source>
                Tu navegador no soporta el reproductor de videos.
            </video>
        </div>
    );
}