const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Conexion a la base de datos exitosa.');
    } catch (error) {
        
        console.log(error);
        
        throw new Error('Error al intentar conectar a la base de datos');
    }
}

module.exports= {
    dbConnection
}