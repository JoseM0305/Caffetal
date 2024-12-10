function esAdmin(req, res, next) {
    if (req.session.rol !== 'admin') {
        return res.status(403).send('Acceso denegado');
    }
    next();
}

function esCliente(req, res, next) {
    if (req.session.rol !== 'usuario') {
        return res.status(403).send('Acceso denegado');
    }
    next();
}

module.exports = { esAdmin, esCliente };