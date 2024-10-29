const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'caffetal',
    user: 'root',
    password: ''
});

conexion.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('Conexión exitosa');
    }
});

module.exports = conexion;