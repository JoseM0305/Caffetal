const conexion = require('../config/db');
const ProductoModel = require('../models/ProductoModel');

class ProductoDAO {
    async getProductos() {
        const [rows] = await conexion.query('SELECT * FROM productos');
        return rows.map(
            (row) =>
                new ProductoModel(
                    row.id,
                    row.nombre,
                    row.descripcion,
                    row.precio,
                    row.categoria,
                    row.stock
                )
        );
    }

    async agregarProducto(producto) {
        await conexion.execute(
            'INSERT INTO productos (nombre, descripcion, precio, categoria, stock) VALUES (?, ?, ?, ?, ?)',
            [producto.nombre, producto.descripcion, producto.precio, producto.categoria, producto.stock]
        );
    }

    async obtenerProductoPorId(id) {
        const [rows] = await conexion.execute('SELECT * FROM productos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        const row = rows[0];
        return new ProductoModel(
            row.id,
            row.nombre,
            row.descripcion,
            row.precio,
            row.categoria,
            row.stock
        );
    }

    async actualizarProducto(producto) {
        if (!(producto instanceof ProductoModel)) {
            throw new Error('El argumento debe ser una instancia de ProductoModel');
        }
        await conexion.execute(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ? WHERE id = ?',
            [producto.nombre, producto.descripcion, producto.precio, producto.categoria, producto.stock, producto.id]
        );
    }

    async eliminarProducto(id) {
        await conexion.execute('DELETE FROM productos WHERE id = ?', [id]);
    }
}

module.exports = new ProductoDAO();
