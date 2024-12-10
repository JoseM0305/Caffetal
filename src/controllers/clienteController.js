const pedidoDAO = require('../daos/pedidoDAO');
const productoDAO = require('../daos/productoDAO');

class clienteController {

    async mostrarHome(req, res) {
        if (!req.session.usuarioId) {
            return res.redirect('/login');
        }

        try {
            const productos = await productoDAO.getProductos();
            res.render('cliente/home', { nombreUsuario: req.session.nombreUsuario, productos });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error al obtener productos.');
        }
    }

    async mostrarCarrito(req, res) {
        if (!req.session.carrito || req.session.carrito.length === 0) {
            return res.render('cliente/carrito', {
                mensaje: 'No tienes productos en el carrito',
                productosCarrito: [],
                montoTotal: 0,
                estado: 'pendiente',
            });
        }

        const montoTotal = req.session.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        res.render('cliente/carrito', {
            productosCarrito: req.session.carrito,
            montoTotal,
            estado: 'pendiente',
        });
    }

    async agregarAlCarrito(req, res) {
        const productoId = req.params.id;
        const cantidad = req.body.cantidad || 1;

        const producto = await productoDAO.obtenerProductoPorId(productoId);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        if (!req.session.carrito) {
            req.session.carrito = [];
        }

        const index = req.session.carrito.findIndex(item => item.idProducto === productoId);

        if (index !== -1) {
            req.session.carrito[index].cantidad += cantidad;
        } else {
            req.session.carrito.push({
                idProducto: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                precio_unitario: producto.precio,
            });
        }

        res.redirect('/cliente/carrito');
    }

    async confirmarPedido(req, res) {
        const usuarioId = req.session.usuarioId;

        try {
            if (!req.session.carrito || req.session.carrito.length === 0) {
                return res.status(400).send('No hay productos en el carrito para confirmar el pedido.');
            }

            const montoTotal = req.session.carrito.reduce((total, item) => total + item.cantidad * item.precio_unitario, 0);

            const idPedido = await pedidoDAO.crearPedido(usuarioId, montoTotal);

            for (const item of req.session.carrito) {
                await pedidoDAO.agregarDetallePedido(idPedido, item.idProducto, item.cantidad, item.precio_unitario);
            }

            req.session.carrito = [];

            res.redirect('/cliente/home');
        } catch (error) {
            console.error('Error al confirmar el pedido:', error);
            res.status(500).send('Error al confirmar el pedido');
        }
    }

    async mostrarPedidos(req, res) {
        const usuarioId = req.session.usuarioId;

        try {
            const pedidos = await pedidoDAO.obtenerPedidosPorUsuario(usuarioId);

            if (pedidos.length === 0) {
                return res.render('cliente/pedidos', {
                    mensaje: 'No tienes pedidos realizados.',
                    pedidos: [],
                });
            }

            res.render('cliente/pedidos', { pedidos });
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            res.status(500).send('Error al obtener los pedidos.');
        }
    }

    async verDetallesPedido(req, res) {
        const { id } = req.params;

        try {
            const detallesPedido = await pedidoDAO.obtenerDetallesPedido(id);

            if (detallesPedido.length === 0) {
                return res.status(404).send('No se encontraron detalles para este pedido.');
            }

            res.render('cliente/detallesPedido', { detallesPedido });
        } catch (error) {
            console.error('Error al obtener los detalles del pedido:', error);
            res.status(500).send('Error al obtener los detalles del pedido.');
        }
    }

}

module.exports = new clienteController();
