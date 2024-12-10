class UsuarioModel {
    constructor(id, nombre, contraseña, correo, rol, fechaCreacion) {
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.correo = correo;
        this.rol = rol;
        this.fechaCreacion = fechaCreacion;
    }
}

module.exports = UsuarioModel;