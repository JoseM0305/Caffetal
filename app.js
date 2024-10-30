const express = require('express');
const app = express();

const auth = require('./routes/auth');
const admin = require('./routes/admin');
const cliente = require('./routes/cliente');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('');
})

app.use(auth, admin, cliente);

app.use('/public', express.static('./public'));

app.listen(5000, ()=>{
    console.log('Servidor corriendo en http://localhost:5000')
});