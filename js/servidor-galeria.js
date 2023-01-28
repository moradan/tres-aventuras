const http = require('http');
const servidor = http.createServer(servirMedios);
servidor.listen(5500);

function servirMedios(pedido, respuesta) { }