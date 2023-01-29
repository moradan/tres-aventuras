const http = require('http');
const https = require('https');
const nStatic = require('node-static');
const fileServer = new nStatic.Server('./');
const token = "IGQVJXeTdTMWEtWWhBZAmVscjNfaDRHVUZAidlpOVkxqWnluUGxXa29DbFlHM0F6ekY0WEV4ZAVo5U3NCOF9BTlozMU40MWxwS1VwOVR4Q1d3bWNpZAy11OGNhcXVGemFTTUFjR0pfY0lacW5GbFhiRHNhQgZDZD";
const URL = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=" + token;

const servidor = http.createServer(servirMedios);
const puerto = 5500;

function servirMedios(pedido, respuesta) {
    if (pedido.url == '/galeria.html') {
        https.get(URL, procesarRespuesta);
        console.log('actualizando galeria');
    }

    fileServer.serve(pedido, respuesta);
}

function procesarRespuesta(respuesta) {
    console.log(respuesta);
}

servidor.listen(puerto);