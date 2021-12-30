const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            message: 'No hay un token en la Petición'
        });
    }

    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
            );

        console.log(payload);

        req.uid = payload.uid;
        req.name = payload.name;

    }catch(error){

        res.status(401).json({
            ok: false,
            msg: 'Token no válido',
            error
        });
    }

    next();
}

module.exports = {
    validarJWT
}