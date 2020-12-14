const express = require('express');
const {
    registerConsumidor,
    registerEmail,
    createDireccion,
    getDirecciones,
    deleteDireccion,
    updateDireccion } = require('../controllers/consumidores.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const { verificarConsumidor, verificarToken } = require('../middlewares/autenticacion');

// Ruta = /consumidores
let router = express();
// Ruta para registrar un nuevo consumidor
router.post('/register', [
    check('nombre', 'El Nombre es Necesario').notEmpty(),
    check('apellidoPat', 'El Apellido Paterno es Necesario').notEmpty(),
    check('telefono', 'El Telefono es Necesario').notEmpty(),
    check('email', 'El Email es Necesario').isEmail(),
    check('password', 'La Contraseña es Necesaria').notEmpty(),
    validarCampos
], registerConsumidor);
// validar email
router.post('/register/email', [
    check('email', 'el email es necesario').isEmail(),
    validarCampos
], registerEmail);
// Ruta para crear una nueva direccion
router.post('/direcciones/create', [
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
], createDireccion);
// Rota para eliminar una direccion 
router.delete('/direcciones/delete/:idDireccion', [
    verificarToken,
    verificarConsumidor,
    check('idDireccion', 'La direccion debe ser mongoId').isMongoId(),
    validarCampos
], deleteDireccion);
// Ruta para actualizar una direccion
router.put('/direcciones/update/:idDireccion',[
    verificarToken,
    verificarConsumidor,
    check('idDireccion', 'El ID direccion debe ser MONGOID').isMongoId(),
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
], updateDireccion);
// Ruta para mostrar todas las direcciones de un usuario
router.get('/direcciones/get', [
    verificarToken,
    verificarConsumidor
], getDirecciones)

module.exports = router;