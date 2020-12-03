const { Router } = require('express');
const {
    deleteSolicitud,
    getSolicitudes,
    createCategoria,
    updateCategoria,
    desactivateCategoria,
    getCategorias,
    registerAdmin } = require('../controllers/admin.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { verificarToken, verificarAdministrador } = require('../middlewares/autenticacion');

const router = Router(); // -- /admin
// crear un nuevo administrador
router.post('/register', [
    check('email', 'El email es necesario').isEmail(),
    check('password', 'El Password es necesario').notEmpty(),
    check('clave', 'La clave es necesaria').notEmpty(),
    validarCampos
], registerAdmin);
// mostrar todas las solicitudes
router.get('/solicitudes/get', [
    verificarToken,
    verificarAdministrador
], getSolicitudes);
// Eliminar una solicitud
router.delete('/solicitudes/delete/:idSolicitud', [
    verificarToken,
    verificarAdministrador,
    check('idSolicitud', 'El id Solicitud deb ser MONGOID').isMongoId(),
    validarCampos
], deleteSolicitud);
// generar una nueva categoria
router.post('/categorias/create', [
    verificarToken,
    verificarAdministrador,
    check('titulo', 'El titulo de la categoria es necesario').notEmpty(),
    check('descripcion', 'la descripcion de la categoria es necesaria').notEmpty(),
    validarCampos
], createCategoria);
// actualizar una categoria 
router.put('/categorias/update/:idCategoria', [
    verificarToken,
    verificarAdministrador,
    check('idCategoria', 'La categoria debe ser un MODNGOID').isMongoId(),
    check('titulo', 'El titulo de la categoria es necesario').notEmpty(),
    check('descripcion', 'la descripcion de la categoria es necesaria').notEmpty(),
    check('activo', 'El Campo activo (true/false) es requerido').isBoolean(),
    validarCampos
], updateCategoria)
// Desacticar una categoria
router.delete('/categorias/delete/:idCategoria', [
    verificarToken,
    verificarAdministrador,
    check('idCategoria', 'La categoria debe ser un MODNGOID').isMongoId(),
    validarCampos
], desactivateCategoria);

// mostrar todas las categorias
router.get('/categorias/get', [
    verificarToken
], getCategorias);
module.exports = router;