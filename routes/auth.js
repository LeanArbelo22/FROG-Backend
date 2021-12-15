/* 
RUTAS PARA EL PATH: '/api/auth'
*/

/* tradicional
const express = require('express');
const router = express.router(); 
*/

// validator
const { check } = require('express-validator');

const { validateNewUser } = require('../middlewares/validate');

// desestructurado
const { Router } = require('express');
const router = Router(); // funciona como app en index.js

// funciones de los controladores
const { 
    crearUsuario,
    renovarToken
} = require('../controllers/auth');

// GET con callback
router.get('/login', (req, res) => {
    /* [
        check('email').isEmail().withMessage({
            message: 'Email invalido',
          }),
        check('password')
    ], */
    res.json({
        message: 'Bienvenido a nuestra API - Login'
    })
})

// POST (callback en controllers)
router.post('/new-user', 
    [
        check('name', "El nombre es obligatorio").not().isEmpty(),
        check('email', "Email invalido").isEmail().not().isEmpty(),
        check('password', "La contraseña debe tener al menos 6 caracteres").isLength({min: 6}),
        validateNewUser // en middleware/validate
    ]
, crearUsuario );

router.post('/renew',
[
    check('password', "La contraseña debe tener al menos 6 caracteres").isLength({min: 6})
]
, renovarToken); // la funcion se encuentra en controllers/auth

module.exports = router;