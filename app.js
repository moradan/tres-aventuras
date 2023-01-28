const http = require('http');
const nStatic = require('node-static');
const fileServer = new nStatic.Server('./');

const servidor = http.createServer(servirMedios);
const puerto = 5500;

function servirMedios(pedido, respuesta) {
    fileServer.serve(pedido, respuesta);
}


servidor.listen(puerto);