const { check } = require('express-validator')
const { validateUser } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validateJWT');
const { isDate } = require('../helpers/isDate');
const { Router } = require('express');
const router = Router();

const { 
    crearEvento,
    actualizarEvento,
    eliminarEvento,
    getEvento
} = require('../controllers/events');

// Todas las rutas tienes que pasar por la validación del JWT
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

router.put('/actualizar/:id',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
], 
actualizarEvento);

router.delete('/eliminar/:id', eliminarEvento)

module.exports = router;