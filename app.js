const http = require('http');
const https = require('https');
const fs = require('fs');
const nStatic = require('node-static');

const fileServer = new nStatic.Server('./');
const token = "IGQVJXOEhsQ3k5NGJxb0kydmNuZAHNKN3NZAbncyYVJieTlELTZAXdjJpTzRfaG1iNEJfTVNFTi1UdDZAkSkNPWF9URXB0cnFhMGxWdG9QQXJIdjhCQVpNSG5TbEZAjTHVvYXRRdzNaQnctbW9DbU9lendHLQZDZD";
const pedidoInstagram = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=" + token;

const servidor = http.createServer(servirMedios);
const puerto = 5500;
let datos = '';

function servirMedios(pedido, respuesta) {

    if (pedido.url == '/media') {
        https.get(pedidoInstagram, procesarRespuesta);
    } else {
        fileServer.serve(pedido, respuesta);
    }

    function procesarRespuesta(respuesta) {
        respuesta.on('data', pedazoCompleto);
        respuesta.on('end', transmisionCompleta);
    }

    function pedazoCompleto(chunk) {
        datos += chunk;
    }

    function transmisionCompleta() {
        const listaMedios = JSON.parse(datos).data;
        const listaVideos = listaMedios.filter((medio) => medio.media_type == 'VIDEO');
        const cadenaSalida = JSON.stringify(listaVideos);

        respuesta.write(cadenaSalida);

        // datos se debe reinicializar antes de que se vuelva a hacer un pedido por galeria.html
        datos = '';
    }
}


servidor.listen(puerto);