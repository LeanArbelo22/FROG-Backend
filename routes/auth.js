/* 
RUTAS PARA EL PATH: '/api/auth'
*/

const { Router } = require('express');
const router = Router();

// validator
const { check } = require('express-validator');
const { validateUser } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validateJWT');


// funciones de los controladores
const { 
    crearUsuario,
    userLogin,
    renovarToken
} = require('../controllers/auth');


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

// POST (en controllers)
router.post('/new-user', 
    [
        check('name', "El nombre es obligatorio").not().isEmpty(),
        check('email', "Email invalido").isEmail().not().isEmpty(),
        check('password', "La contraseña debe tener al menos 6 caracteres").isLength({min: 6}),
        validateUser
    ]
, crearUsuario );

router.post('/renew',
validarJWT, 
renovarToken);

module.exports = router;