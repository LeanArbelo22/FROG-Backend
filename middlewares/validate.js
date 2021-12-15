const { response } = require('express');
const { validationResult } = require('express-validator');

/* Middleware es una funcion que pasa a traves
de la ruta cuando me hacen una peticion (req).
Cuando el middle es propio es obligatorio usar el param next al finalizar la funcion, de lo contrario la app queda colgada */

const validateNewUser = (req, res = response, next) => {

    const errores = validationResult(req);
    console.log(errores);

    if (!errores.isEmpty()) {
        return res.status(400).json({ error: errores.array() });
        };

    /*  validacion tradicional
        if (password.length < 6){
        console.log("La contraseña ingresada no es valida");
        return res.status(400).json({ 
            error: 'La contraseña debe tener al menos 6 caracteres'
        });
    } */

    next(); // funcion de express, sin esto en caso de no recibir errores la app quedaria colgada ya que la funcion validar recibe los mismos parametros que el controlador
}

module.exports = { validateNewUser };
