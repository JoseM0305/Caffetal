const express = require('express');
const router = express.Router();
const adminController = require('../src/controllers/adminController');
const { esAdmin } = require('../middlewares/auth');

router.get('/dashboard', esAdmin, adminController.mostrarDashboard);

router.get('/usuarios', esAdmin, adminController.mostrarUsuarios);
router.get('/usuarios/editar/:id', esAdmin, adminController.mostrarEditarUsuario);
router.post('/usuarios/editar/:id', esAdmin, adminController.actualizarUsuario);
router.post('/usuarios/eliminar/:id', esAdmin, adminController.eliminarUsuario);

router.get('/productos', esAdmin, adminController.mostrarProductos);
router.get('/productos/agregar', esAdmin, adminController.mostrarAgregarProducto);
router.post('/productos/agregar', esAdmin, adminController.agregarProducto);
router.get('/productos/editar/:id', esAdmin, adminController.mostrarEditarProducto);
router.post('/productos/editar/:id', esAdmin, adminController.actualizarProducto);
router.post('/productos/eliminar/:id', esAdmin, adminController.eliminarProducto);

router.get('/pedidos', esAdmin, adminController.mostrarPedidos);
router.get('/pedidos/:id', esAdmin, adminController.mostrarDetallesPedido);
router.post('/pedidos/:id/cambiarEstado', esAdmin, adminController.cambiarEstadoPedido);

module.exports = router;
