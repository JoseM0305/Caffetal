const express = require('express');
const auth = express.Router();

auth.get('/register', (req, res) => {
    res.render('register');
});

auth.get('/login', (req, res) => {
    res.render('login');
});

module.exports = auth;