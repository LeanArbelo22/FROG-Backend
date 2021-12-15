// CONFIGURACION
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const app = express();

dbConnection();

// MIDDLEWARE conexion con archivos estaticos y json
//app.use(express.static('public')); // funciona como res.sendFile
app.use(express.json());
// RUTAS REALES
app.use('/api/auth', require('./routes/auth'))

// RUTA DE PRUEBA
// GET
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/pubic/index.html');
    console.log('Han realizado una peticion a home');
    //res.send('Peticion recibida correctamente')
    res.json({
        message: 'Bienvenido a HOME. Peticion recibida correctamente'
    })
})

// CALLBACK
// usando .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})

/* sin usar .env 
const Port = 8080;
app.listen(Port, () => {
    console.log(`Servidor corriendo en el puerto ${Port}`);
}) */