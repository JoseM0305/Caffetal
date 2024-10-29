const express = require('express'); //Invocamos a express
const app = express(); //Nos va a permitir usar todos los métodos de la libreria

app.set('view engine', 'ejs'); //Indicamos el motor de plantilla que vamos a usar

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public')); //Indicamos la ubicación del css

app.use('/', require('./router'));

app.listen(5000, ()=>{ //Nos permite ejecutarlo en el puerto 5000
    console.log('Servidor corriendo en http://localhost:5000')
});