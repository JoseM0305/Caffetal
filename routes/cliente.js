const express = require('express');
const cliente = express.Router();

cliente.get('/clienteHistorial', (req, res) => {
    res.render('clienteHistorial');
});

cliente.get('/clienteProductos', (req, res) => {
    res.render('clienteProductos');
});

cliente.get('/detallesHistorial', (req, res) => {
    res.render('detallesHistorial');
});

module.exports = cliente;