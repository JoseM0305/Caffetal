const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'caffetal'
});

console.log('Conexión exitosa a la base de datos');

module.exports = conexion;
