const usuarioDAO = require('../daos/usuarioDAO');

class UsuarioController {
    async mostrarLogin(req, res) {
        res.render('sesion/login', { error: null });
    }

    async login(req, res) {
        const { correo, contraseña } = req.body;

        try {
            const usuario = await usuarioDAO.getUsuarioPorCorreo(correo);
            if (!usuario) {
                return res.render('sesion/login', { error: 'Correo o contraseña incorrectos' });
            }

            const esValida = await usuarioDAO.validarContraseña(usuario, contraseña);
            if (!esValida) {
                return res.render('sesion/login', { error: 'Correo o contraseña incorrectos' });
            }

            req.session.usuarioId = usuario.id;
            req.session.nombreUsuario = usuario.nombre;
            req.session.rol = usuario.rol;

            if (usuario.rol === 'admin') {
                return res.redirect('/admin/dashboard');
            } else {
                return res.redirect('/cliente/home');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar la sesión:', err);
                return res.status(500).send('Ocurrió un error al cerrar la sesión.');
            }

            res.redirect('/login');
        });
    }

    async mostrarRegister(req, res) {
        res.render('sesion/register', { error: null, success: null });
    }

    async registrarUsuario(req, res) {
        const { nombre, correo, contraseña } = req.body;

        try {
            const usuarioExistente = await usuarioDAO.getUsuarioPorCorreo(correo);
            if (usuarioExistente) {
                return res.render('sesion/register', {
                    error: 'El correo ya está registrado.',
                    success: null,
                });
            }

            const nuevoUsuario = {
                nombre,
                correo,
                contraseña,
                rol: 'usuario',
                fechaCreacion: new Date()
            };

            await usuarioDAO.createUsuario(nuevoUsuario);

            res.render('sesion/register', {
                error: null,
                success: `Usuario ${nombre} registrado con éxito. Puedes iniciar sesión.`,
            });
        } catch (error) {
            res.render('sesion/register', { error: 'Error al registrar el usuario.', success: null });
        }
    }
}

module.exports = new UsuarioController();
