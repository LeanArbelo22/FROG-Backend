/* 
RUTAS PARA EL PATH: '/api/auth'
*/

/* tradicional
const express = require('express');
const router = express.router(); 
*/

// validator
const { check } = require('express-validator');

const { validateUser } = require('../middlewares/validate');

// desestructurado
const { Router } = require('express');
const router = Router(); // funciona como app en index.js

// funciones de los controladores
const { 
    crearUsuario,
    userLogin,
    renovarToken
} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validateJWT');

// GET con callback
/* router.get('/login', (req, res) => {
    [
        check('email').isEmail().withMessage({
            message: 'Email invalido',
          }),
        check('password')
    ],
    res.json({
        message: 'Bienvenido a nuestra API - Login'
    })
}) */

// POST / GET
router.post('/login', 
[
    check('email').isEmail().withMessage({
        message: 'Email invalido',
      }),
    check('password', "La contraseña debe tener al menos 6 caracteres").isLength({min: 6}),
    validateUser
],
userLogin)

// POST (callback en controllers)
router.post('/new-user', 
    [
        check('name', "El nombre es obligatorio").not().isEmpty(),
        check('email', "Email invalido").isEmail().not().isEmpty(),
        check('password', "La contraseña debe tener al menos 6 caracteres").isLength({min: 6}),
        validateUser // en middleware/validate
    ]
, crearUsuario );

// POST o PUT (para actualizar contraseña, deberia ser PATCH)
router.post('/renew',
validarJWT
, renovarToken); // la funcion se encuentra en controllers/auth

module.exports = router;