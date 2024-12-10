const conexion = require('../config/db');
const UsuarioModel = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

class UsuarioDAO {
    async getUsuarios() {
        const [rows] = await conexion.query('SELECT * FROM usuarios');
        return rows.map(
            (row) =>
                new UsuarioModel(
                    row.id,
                    row.nombre,
                    row.contraseña,
                    row.correo,
                    row.rol,
                    row.fecha_creacion
                )
        );
    }

    async getUsuarioPorCorreo(correo) {
        const [rows] = await conexion.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (rows.length === 0) return null;

        const usuario = rows[0];
        return new UsuarioModel(
            usuario.id,
            usuario.nombre,
            usuario.contraseña,
            usuario.correo,
            usuario.rol,
            usuario.fecha_creacion
        );
    }

    async obtenerUsuarioPorId(id) {
        const [rows] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) return null;

        const usuario = rows[0];
        return new UsuarioModel(
            usuario.id,
            usuario.nombre,
            usuario.contraseña,
            usuario.correo,
            usuario.rol,
            usuario.fecha_creacion
        );
    }

    async createUsuario(usuario) {
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);

        await conexion.query(
            'INSERT INTO usuarios (nombre, contraseña, correo, rol, fecha_creacion) VALUES (?, ?, ?, ?, ?)',
            [
                usuario.nombre,
                usuario.contraseña,
                usuario.correo,
                usuario.rol || 'usuario',
                usuario.fechaCreacion || new Date(),
            ]
        );
    }

    async actualizarUsuario(usuario) {
        if (!(usuario instanceof UsuarioModel)) {
            throw new Error('El argumento debe ser una instancia de UsuarioModel');
        }

        await conexion.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?',
            [usuario.nombre, usuario.correo, usuario.rol, usuario.id]
        );
    }

    async eliminarUsuario(id) {
        await conexion.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    }

    async validarContraseña(usuario, contraseña) {
        return await bcrypt.compare(contraseña, usuario.contraseña);
    }
}

module.exports = new UsuarioDAO();
