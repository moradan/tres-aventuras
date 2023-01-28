function Player(props) {
    const reproductorPointer = React.useRef(null);
    const url = "https://video.cdninstagram.com/v/t50.33967-16/10000000_362536269287578_6235083293189663100_n.mp4?_nc_cat=102&vs=5180161372110318_3557856934&_nc_vs=HBksFQAYJEdJQ1dtQUNha0l5TnVVa0JBSHpwaW1NNGQ0ZFdicV9FQUFBRhUAAsgBABUAGCRHSzdjZmhHSGVhY01hazhGQUs1Q2dDZzl2S0U0YnFfRUFBQUYVAgLIAQAoABgAGwGIB3VzZV9vaWwBMRUAACacvu2koO%2BDQRUCKAJDMywXQFZpysCDEm8YEmRhc2hfYmFzZWxpbmVfMV92MREAdQAA&ccb=1-7&_nc_sid=59939d&efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjcyMC5jbGlwcyJ9&_nc_ohc=homGIVGk75IAX8WWXRa&_nc_ht=video.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCLBepo-9Nq0ywCsJlb9Eis8S8grisMyxM6UjPVjiB9EQ&oe=63D46C8B&_nc_rid=d06d3c7fb8";

    function cerrarReproductor(e) {
        if (e.target == e.currentTarget) {
            reproductorPointer.current.pause();
            reproductorPointer.current.currentTime = 0;
            props.cerrar();
        }
    }

    return (
        <div className={`cortina ${props.visible}`} onClick={cerrarReproductor}>
            <video
                className="reproductor"
                ref={reproductorPointer}
                src={props.url}
                controls
                autoPlay>
                Tu navegador no soporta el reproductor de videos.
            </video>
        </div>
    );
}