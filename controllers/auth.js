const express = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario')

/* Response desestructurado 
const { response } = require('express')
si uso esto, en vez de usar express.response se utiliza solo response
resolver por que no funciona
*/

// para .post('/api/auth/new-user')
const crearUsuario = async (req, res = express.response) => {
    // express.response es para que al escribir res. muestre sugerencias especificas
    // console.log(req.body);

    // req.body desestructurado
    const {name, email, password} = req.body;
    
    const usuario = new Usuario(req.body);
    await usuario.save();


    res.status(201).json({
        message: 'Usuario creado correctamente',
        //user: req.body, puedo llamar a sus propiedades (body.name por ej)
        //desestructurado seria simplemente usar name, email y password
        user: {name, email, password}}
        );

    /* original en middlewares/validate
    const errores = validationResult(req);
    if (errores.isEmpty()) {
        return res.status(201).json({
            message: 'Usuario creado correctamente',
            //user: req.body, puedo llamar a sus propiedades (body.name por ej)
            //desestructurado seria simplemente usar name, email y password
            user: {name, email, password}
        });
      }
      res.status(400).json({ error: errores.array() }); */
}

// para post.('/api/auth/renew)
const renovarToken = (req, res = express.response) => {
    //console.log('Han renovado los permisos de usuario');
    
    const {password} = req.body;

    const errores = validationResult(req);
    console.log(errores);

    //otra forma de hacerlo
    if (!errores.isEmpty()) {
    return res.status(400).json({ error: errores.array() });
    }
    res.json({
        message: 'Renovacion de permisos con Token realizada',
        user: {password}
    })
}



module.exports = {
    crearUsuario,
    renovarToken
}