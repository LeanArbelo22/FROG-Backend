const express = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarToken } = require('../helpers/JWT')

// encriptacion de password
const bcrypt = require('bcryptjs')

// para .post('/api/auth/new-user')
const crearUsuario = async (req, res = express.response) => {

    const { name, email, password, frogcard } = req.body

    try {
        
        // validando si existen ciertos datos en la bd
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            return res.status(500).json({
                message: "Email ya registrado"
            })
        }

        // creando usuario en la base de datos a partir del Schema
        usuario = new Usuario(req.body);

        // encriptacion
        salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // guardar el usuario
        await usuario.save();

        // generamos el token de acceso a la aplicacion
        const token = await generarToken(usuario.id, usuario.name);
        console.log(token);

        res.status(201).json({
            message: 'Usuario creado correctamente',
            user: { name, email, password, frogcard },
            uid: usuario.id,
            token
        }
        );

    } catch (error) { // error en la base de datos
        res.status(500).json({
            "message": "El usuario no pudo crearse",
            "error": error.keyValue
        })
    }
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
            user: { email },
            token
        });

    } catch (error) { // error en la busqueda de la base de datos
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

}



module.exports = {
    crearUsuario,
    userLogin,
    renovarToken
}