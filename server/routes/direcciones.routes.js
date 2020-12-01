const { Router } = require('express');
const { postDireccion, deleteDireccion, getDirecciones } = require('../controllers/direcciones.controller');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { verificarToken, verificarConsumidor } = require('../middlewares/autenticacion');

const router = Router();
// /direcciones 

router.post('/consumidor/post', [
    verificarToken,
    verificarConsumidor,
    check('contacto.nombre', 'El Nombre es requerido').notEmpty(),
    check('contacto.apellidoPat', 'El Apellido es requerido').notEmpty(),
    check('contacto.telefono', 'El Telefono es requerido').notEmpty(),
    check('domicilio.cp', 'El Codigo Postal es requerido').notEmpty(),
    check('domicilio.colonia', 'La Colonia es requerida').notEmpty(),
    check('domicilio.calle', 'La Calle Postal es requerida').notEmpty(),
    check('domicilio.numExt', 'El Codigo Postal es requerido').notEmpty(),
    check('domicilio.descripcion', 'La Descripcion es requerida').notEmpty(),
    check('domicilio.entreCalle1', 'Entre Calle 1 es requerido').notEmpty(),
    check('domicilio.entreCalle2', 'Entre Calle 2 es requerido').notEmpty(),
    validarCampos
], postDireccion);

router.delete('/consumidor/delete/:id', [
    check('id', 'El ID debe ser mongoID').isMongoId(),
    check('direccion', 'La direccion debe ser mongoId').isMongoId(),
    validarCampos
], deleteDireccion);

router.get('/consumidor/get/:id', [
    check('id', 'El ID debe ser MongoID').isMongoId(),
    validarCampos
], getDirecciones)
module.exports = router;