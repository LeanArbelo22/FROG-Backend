// CONFIGURACION
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const compression = require('compression');
const Usuario = require('./models/Usuario');

const app = express();

// conexion a 
dbConnection();

app.use(compression());
app.use(cors());
app.use(express.json());

// RUTAS REALES
app.use('/api/auth', require('./routes/auth'));

// FRONTEND
/* app.use('/', express.static(path.join(__dirname, '//'))); */

// RUTA DE PRUEBA
// GET
app.get('/api/auth/users', async (req, res) => {
    const users = await Usuario.find().lean().exec();
    res.status(200).send({users})
    /* res.json({
        message: "Bienvenido",
        description: "Accediendo a la api con metodo get"
    }) */
})

// usando .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})