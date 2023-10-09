const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
// Middleware para servir archivos estáticos, como imágenes
server.use(express.static('public'));
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);


module.exports = server;
