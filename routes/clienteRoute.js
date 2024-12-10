const express = require('express');
const router = express.Router();
const clienteController = require('../src/controllers/clienteController');
const { esCliente } = require('../middlewares/auth');

router.get('/home', esCliente, clienteController.mostrarHome);

router.post('/carrito/agregar/:id', esCliente, clienteController.agregarAlCarrito);
router.get('/carrito', esCliente, clienteController.mostrarCarrito);
router.post('/carrito/confirmar', esCliente, clienteController.confirmarPedido);
router.get('/pedidos/detalles/:id', esCliente, clienteController.verDetallesPedido);

router.get('/pedidos', esCliente, clienteController.mostrarPedidos);
router.get('/pedido/:id', esCliente, clienteController.verDetallesPedido);

router.get('/pedidos/:id', esCliente, clienteController.verDetallesPedido);
router.get('/pedidos/detalles/:id', esCliente, clienteController.verDetallesPedido);

module.exports = router;