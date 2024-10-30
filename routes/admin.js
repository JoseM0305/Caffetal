const express = require('express');
const admin = express.Router();

admin.get('/editarProducto', (req, res) => {
    res.render('editarProducto');
});

admin.get('/editarCliente', (req, res) => {
    res.render('editarCliente');
});

admin.get('/listaClientes', (req, res) => {
    res.render('listaClientes');
});

admin.get('/listaPedidos', (req, res) => {
    res.render('listaPedidos');
});

admin.get('/listaProductos', (req, res) => {
    res.render('listaProductos');
});

admin.get('/detallesPedido', (req, res) => {
    res.render('detallesPedido');
});

admin.get('/crearProducto', (req, res) => {
    res.render('crearProducto');
});

admin.get('/vistaAdmin', (req, res) => {
    res.render('vistaAdmin');
});

module.exports = admin;