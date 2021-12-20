const express = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarToken } = require('../helpers/JWT')

// encriptacion de password
const bcrypt = require('bcryptjs')

/* Response desestructurado 
const { response } = require('express/lib/response')
si uso esto, en vez de usar express.response se utiliza solo response
*/

// para .post('/api/auth/new-user')
const crearUsuario = async (req, res = express.response) => {
    // express.response es para que al escribir res. muestre sugerencias especificas
    // console.log(req.body);

    // req.body desestructurado
    const { name, email, password } = req.body;

    try {
        
        // validando si existen ciertos datos en la bd
        let usuario = await Usuario.findOne({email});
        //console.log(usuario); null
        
        if(usuario){
            return res.status(500).json({
                message: "Email ya registrado"
            })
        }

        // creando usuario en la base de datos a partir del Schema
        usuario = new Usuario(req.body);

        // encriptacion
        salt = bcrypt.genSaltSync(/* 10 por defecto */);
        usuario.password = bcrypt.hashSync(password, salt);

        // generamos el token de acceso a la aplicacion
        const token = await generarToken(usuario.id, usuario.name);
        console.log(token);

        // guardar el usuario
        await usuario.save();

        res.status(201).json({
            message: 'Usuario creado correctamente',
            //user: req.body, puedo llamar a sus propiedades (body.name por ej)
            //desestructurado seria simplemente usar name, email y password
            user: { name, email, password },
            token
        }
        );
    } catch (error) { // error en la base de datos
        res.status(500).json({
            "message": "El usuario no pudo crearse",
            "error": error.keyValue
        })
    }

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

// para .post('/api/auth/login')
const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email})        

        if(!usuario){
            return res.status(400).json({
                message: "Usuario no encontrado"
            })
        }

        // comparacion de password
        const validarPassword = bcrypt.compareSync(password, usuario.password)

        if(!validarPassword){
            return res.status(400).json({
                message: "Contraseña incorrecta"
            })
        }

        // generamos el token de acceso a la aplicacion
        const token = await generarToken(usuario.id, usuario.name);
        console.log(token);

        res.status(200).json({
            message: 'Bienvenido',
            user: { email }
        });
    } catch (error) { // cuando hay un error en la busqueda de la base de datos se muestra este
        res.status(500).json({
            "message": "Error al intentar verificar los datos",
        })
    }
}

// para .post('/api/auth/renew) pudede ser put
const renovarToken = async (req, res = express.response) => {
    
    const uid = req.uid;
    const name = req.name;

    const token = await generarToken(uid, name);
    console.log(token);
    
    res.json({
        message: 'Renovamos tu permiso con este Token', 
        token
    });

/*     const { password } = req.body;

    const errores = validationResult(req);
    console.log(errores);

    //otra forma de hacerlo
    if (!errores.isEmpty()) {
        return res.status(400).json({ error: errores.array() });
    }
    res.json({
        message: 'Renovacion de permisos con Token realizada',
        user: { password }
    }) */
}



module.exports = {
    crearUsuario,
    userLogin,
    renovarToken
}