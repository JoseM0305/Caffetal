const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'cftLock',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    })
);

const usuarioRoute = require('./routes/usuarioRoute');
const adminRoute = require('./routes/adminRoute');
const clienteRoute = require('./routes/clienteRoute');
app.use('/', usuarioRoute);
app.use('/admin', adminRoute);
app.use('/cliente', clienteRoute);

app.listen(5000);