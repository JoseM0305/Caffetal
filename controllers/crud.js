const conexion = require('../util/db');

exports.save = (req, res) => {
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    conexion.query('insert into clientes set ?', { telefono: telefono, direccion: direccion }, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
}

exports.update = (req, res) => {
    const id_cliente = req.body.id_cliente;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    conexion.query('update clientes set ? where id_cliente = ?', [{telefono: telefono, direccion: direccion }, id_cliente], (err, results) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
}