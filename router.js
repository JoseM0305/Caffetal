const express = require('express');
const router = express.Router();

const conexion = require('./util/db')

router.get('/', (req, res) => {
    res.render('');
});

router.get('/editarProducto', (req, res) => {
    res.render('editarProducto');
});

router.get('/editarCliente', (req, res) => {
    res.render('editarCliente');
});

router.get('/listaClientes', (req, res) => {
    res.render('listaClientes');
});

router.get('/listaPedidos', (req, res) => {
    res.render('listaPedidos');
});

router.get('/listaProductos', (req, res) => {
    res.render('listaProductos');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/detallesPedido', (req, res) => {
    res.render('detallesPedido');
});

router.get('/clienteHistorial', (req, res) => {
    res.render('clienteHistorial');
});

router.get('/clienteProductos', (req, res) => {
    res.render('clienteProductos');
});

router.get('/detallesHistorial', (req, res) => {
    res.render('detallesHistorial');
});

router.get('/vistaAdmin', (req, res) => {
    res.render('vistaAdmin');
});

router.get('/crearProducto', (req, res) => {
    res.render('crearProducto');
});

module.exports = router;