const usuarioDAO = require('../daos/usuarioDAO');
const productoDAO = require('../daos/productoDAO');
const pedidoDAO = require('../daos/pedidoDAO');
const ProductoModel = require('../models/ProductoModel');
const UsuarioModel = require('../models/UsuarioModel');

class adminController {
    
    async mostrarDashboard(req, res) {
        res.render('admin/dashboard', { nombreAdmin: req.session.nombreUsuario });
    }

    async mostrarUsuarios(req, res) {
        const usuarios = await usuarioDAO.getUsuarios();
        res.render('admin/listaUsuarios', { usuarios });
    }

    async mostrarEditarUsuario(req, res) {
        const usuario = await usuarioDAO.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.render('admin/editarUsuario', { usuario });
    }

    async actualizarUsuario(req, res) {
        const { nombre, correo, rol } = req.body;
        const usuario = new UsuarioModel(req.params.id, nombre, null, correo, rol, null);

        await usuarioDAO.actualizarUsuario(usuario);
        res.redirect('/admin/usuarios');
    }

    async eliminarUsuario(req, res) {
        await usuarioDAO.eliminarUsuario(req.params.id);
        res.redirect('/admin/usuarios');
    }

    async mostrarProductos(req, res) {
        const productos = await productoDAO.getProductos();
        res.render('admin/listaProductos', { productos });
    }

    async mostrarAgregarProducto(req, res) {
        res.render('admin/agregarProducto');
    }

    async agregarProducto(req, res) {
        const producto = new ProductoModel(
            null,
            req.body.nombre,
            req.body.descripcion,
            parseFloat(req.body.precio),
            req.body.categoria,
            parseInt(req.body.stock)
        );

        await productoDAO.agregarProducto(producto);
        res.redirect('/admin/productos');
    }

    async mostrarEditarProducto(req, res) {
        const producto = await productoDAO.obtenerProductoPorId(req.params.id);
        res.render('admin/editarProducto', { producto });
    }

    async actualizarProducto(req, res) {
        const producto = new ProductoModel(
            req.params.id,
            req.body.nombre,
            req.body.descripcion,
            parseFloat(req.body.precio),
            req.body.categoria,
            parseInt(req.body.stock)
        );

        await productoDAO.actualizarProducto(producto);
        res.redirect('/admin/productos');
    }

    async eliminarProducto(req, res) {
        await productoDAO.eliminarProducto(req.params.id);
        res.redirect('/admin/productos');
    }

    async mostrarPedidos(req, res) {
        try {
            const pedidos = await pedidoDAO.obtenerTodosLosPedidos();

            res.render('admin/listarPedidos', { pedidos });
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
            res.status(500).send('Error al obtener los pedidos');
        }
    }

    async mostrarDetallesPedido(req, res) {
        const { id } = req.params;

        try {
            const detalles = await pedidoDAO.obtenerDetallesPedido(id);
            
            if (detalles.length === 0) {
                return res.status(404).send('No se encontraron detalles para este pedido.');
            }

            res.render('admin/detallesPedido', { detalles });
        } catch (error) {
            console.error('Error al obtener los detalles del pedido:', error);
            res.status(500).send('Error al obtener los detalles del pedido');
        }
    }

    async cambiarEstadoPedido(req, res) {
        const { id } = req.params;
        try {
            const pedido = await pedidoDAO.obtenerPedidosPorUsuario(id);

            if (!pedido) {
                return res.status(404).send('Pedido no encontrado.');
            }

            if (pedido.estado === 'confirmado') {
                return res.status(400).send('Este pedido ya está confirmado.');
            }

            await pedidoDAO.actualizarEstadoPedido(id, 'confirmado');

            res.redirect('/admin/pedidos');
        } catch (error) {
            console.error('Error al cambiar el estado del pedido:', error);
            res.status(500).send('Error al cambiar el estado del pedido');
        }
    }
}

module.exports = new adminController();