const conexion = require('../config/db');

class PedidoDAO {
    async crearPedido(idUsuario, montoTotal) {
        const [result] = await conexion.execute(
            'INSERT INTO pedidos (id_usuario, monto_total, fecha_creacion, estado) VALUES (?, ?, ?, ?)',
            [idUsuario, montoTotal, new Date(), 'pendiente']
        );
        return result.insertId;
    }

    async agregarDetallePedido(idPedido, idProducto, cantidad, precioUnitario) {
        await conexion.execute(
            'INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
            [idPedido, idProducto, cantidad, precioUnitario]
        );
    }

    async obtenerPedidoPendiente(idUsuario) {
        const [rows] = await conexion.query(
            'SELECT * FROM pedidos WHERE id_usuario = ? AND estado = "pendiente" LIMIT 1',
            [idUsuario]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async obtenerDetallesPedido(idPedido) {
        const [rows] = await conexion.query(
            'SELECT dp.id, p.nombre, dp.cantidad, dp.precio_unitario FROM detalles_pedido dp JOIN productos p ON dp.id_producto = p.id WHERE dp.id_pedido = ?',
            [idPedido]
        );
        return rows;
    }

    async obtenerTodosLosPedidos() {
        const [rows] = await conexion.query(
            'SELECT p.id, p.monto_total, p.fecha_creacion, p.estado, u.nombre AS usuario FROM pedidos p JOIN usuarios u ON p.id_usuario = u.id'
        );
        return rows;
    }

    async obtenerPedidosPorUsuario(idUsuario) {
        const [rows] = await conexion.query(
            'SELECT * FROM pedidos WHERE id_usuario = ?',
            [idUsuario]
        );
        return rows;
    }

    async actualizarEstadoPedido(idPedido, estado) {
        await conexion.execute(
            'UPDATE pedidos SET estado = ? WHERE id = ?',
            [estado, idPedido]
        );
    }
}

module.exports = new PedidoDAO();
