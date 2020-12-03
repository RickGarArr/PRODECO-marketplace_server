const express = require('express');
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const {
    getSolicitud,
    postSolicitud,
    sendImage
} = require('../controllers/solicitudes.controller');

// Ruta -------------------------------------------- /solicitudes
const router = express();
router.use(expressFileUpload());

// mostrar solo una solicitud por email
router.get('/get-by-email',[
    check('email', 'El Email es requerido').isEmail(),
    validarCampos
], getSolicitud);
// crear nueva solicitud
router.post('/post', [
    check('nombre', 'El campo NOMBRE es requerido').notEmpty(),
    check('telefono', 'El campo TELEFONO es requerido').notEmpty(),
    check('email', 'El campo EMAIL es requerido').notEmpty(),
    validarCampos
], postSolicitud);
// ruta para mostrar archivos
router.get('/file/:id/:imagen', [
    check('id', 'El es necesario').notEmpty(),
    check('imagen', 'la imagen debe ser necesaria').notEmpty(),
    validarCampos
],sendImage);
module.exports = router;

