// Ruta -------------------------------------------- /solicitudes
const express = require('express');
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
// controladores
const {
    getSolicitudes,
    getSolicitud,
    postSolicitud,
    sendImage
} = require('../controllers/solicitudes.controller');

const router = express();
router.use(expressFileUpload());
// -------------------------------------------------------------- Rutas 
// mostrar todas las solicitudes
router.get('/get-all',  getSolicitudes);
// mostrar solo una solicitud por id
router.get('/get-one/:id',[
    check('id', 'Se requiere mongoID').isMongoId(),
    validarCampos
], getSolicitud);
// crear nueva solicitud
router.post('/post', [
    check('nombre', 'El campo NOMBRE es requerido').notEmpty(),
    check('telefono', 'El campo TELEFONO es requerido').notEmpty(),
    check('email', 'El campo EMAIL es requerido').notEmpty(),
    validarCampos
], postSolicitud);

router.get('/file/:id/:imagen', [
    check('id', 'El es necesario').notEmpty(),
    check('imagen', 'la imagen debe ser necesaria').notEmpty(),
    validarCampos
],sendImage);
module.exports = router;

