const express = require('express');
const router = express.Router();

const conexion = require('./util/db')

router.get('/', (req, res) => {
    conexion.query('select * from clientes', function (err, results) {
        if (err) {
            throw err;
        } else {
            res.render('index', { results: results });
        }
    });
});

router.get('/create', (req, res) => {
    res.render('create');
})

router.get('/edit/:id_cliente', (req, res) => {
    const id_cliente = req.params.id_cliente;
    conexion.query('select * from clientes where id_cliente=?', [id_cliente], (err, results) => {
        if (err) {
            throw err;
        } else {
            res.render('edit', { user: results[0] });
        }
    })
})

router.get('/delete/:id_cliente', (req, res) => {
    const id_cliente = req.params.id_cliente;
    conexion.query('delete from clientes where id_cliente = ?', [id_cliente], (err, results) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
})

const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;