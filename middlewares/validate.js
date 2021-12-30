const { response } = require('express');
const { validationResult } = require('express-validator');

const validateUser = (req, res = response, next) => {

    // manejo de errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({ 
            error: errores.array() 
        });
        };

    next(); 
}

module.exports = { validateUser };
