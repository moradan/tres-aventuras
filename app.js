const http = require('http');
const https = require('https');
const fs = require('fs');
const nStatic = require('node-static');

const fileServer = new nStatic.Server('./');
const token = "IGQVJXeTdTMWEtWWhBZAmVscjNfaDRHVUZAidlpOVkxqWnluUGxXa29DbFlHM0F6ekY0WEV4ZAVo5U3NCOF9BTlozMU40MWxwS1VwOVR4Q1d3bWNpZAy11OGNhcXVGemFTTUFjR0pfY0lacW5GbFhiRHNhQgZDZD";
const URL = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=" + token;

const servidor = http.createServer(servirMedios);
const puerto = 5500;
let datos = '';

function servirMedios(pedido, respuesta) {

    if (pedido.url == '/galeria.html') {
        https.get(URL, procesarRespuesta);
    }

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

    fs.writeFile('./data/galeria.json', cadenaSalida, { flag: 'w' }, (err) => console.log(err));
    // datos se debe reinicializar antes de que se vuelva a hacer un pedido por galeria.html
    datos = '';
}

servidor.listen(puerto);