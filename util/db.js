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

// conexion.query('select * from clientes', function (error, resultados, cambios) {
//     if (error) {
//         throw error;
//     } else {
//         resultados.forEach(resultado => {
//             console.log(resultado);
//         });
//     }
// });

// conexion.query('insert into clientes (telefono, direccion) values ("978637264", "Calle Leoncio Prada 911")', function (error, resultados) {
//     if (error) {
//         throw error;
//     } else {
//         console.log('Registro exitoso', resultados);
//     }
// });

// conexion.query('update clientes set telefono = "987654321", direccion = "Calle Leoncio Prada 900" where id_cliente = 1011', function (error, resultados) {
//     if (error) {
//         throw error;
//     } else {
//         console.log('Registro exitoso', resultados);
//     }
// });

// conexion.query('delete from clientes where id_cliente = 1011', function (error, resultados) {
//     if (error) {
//         throw error;
//     } else {
//         console.log('Registro exitoso', resultados);
//     }
// });

// conexion.end();