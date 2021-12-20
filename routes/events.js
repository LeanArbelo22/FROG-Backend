const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { validateUser } = require('../middlewares/validate');
const { isDate } = require('../helpers/isDate');

const { 
    crearEvento,
    actualizarEvento,
    eliminarEvento,
    getEvento
} = require('../controllers/events');
const { validarJWT } = require('../middlewares/validateJWT');

router.use(validarJWT)

// repsonde a path '/api/events'
router.get('/', getEvento);

router.post('/crear', 
[
    check('title', "El titulo es obligatorio").not().isEmpty(),
    check('start', "Fecha de inicio obligatoria").not().isEmpty().custom(isDate),
    check('end', "Fecha de finalizacion obligatoria").not().isEmpty().custom(isDate),
    validateUser
], crearEvento)

router.put('/actualizar/:id', actualizarEvento);

router.delete('/eliminar/:id', eliminarEvento)

module.exports = router;