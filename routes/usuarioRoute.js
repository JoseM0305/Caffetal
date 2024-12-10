const express = require('express');
const router = express.Router();
const usuarioController = require('../src/controllers/usuarioController');

router.get('/', (req, res) => {
    res.redirect('/login');
})

router.get('/login', usuarioController.mostrarLogin);
router.post('/login', usuarioController.login);
router.get('/logout', usuarioController.logout);

router.get('/register', usuarioController.mostrarRegister);
router.post('/register', usuarioController.registrarUsuario);

module.exports = router;
