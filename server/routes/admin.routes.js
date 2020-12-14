const { Router } = require('express');
const {
    getCategorias,
    getComercios,
    getConsumidores,
    getSolicitudes,

    deleteSolicitud,
    desactivateComercio,
    desactivateCategoria,
    desactivateConsumidor,

    sendEmailCtrl,
    createCategoria,
    updateCategoria,
    registerAdmin, 
} = require('../controllers/admin.controller');
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

//#region GETS
// mostrar todas las solicitudes
router.get('/solicitudes/get', [
    verificarToken,
    verificarAdministrador
], getSolicitudes);
// mostrar todos los comercios
router.get('/comercios/get', [
    verificarToken,
    verificarAdministrador
], getComercios);
// mostrar todos los consumidores
router.get('/consumidores/get', [
    verificarToken,
    verificarAdministrador
], getConsumidores );
//#endregion GETS

//#region DELETE
// Eliminar una solicitud
router.delete('/solicitudes/delete/:idSolicitud', [
    verificarToken,
    verificarAdministrador,
    check('idSolicitud', 'El id Solicitud deb ser MONGOID').isMongoId(),
    validarCampos
], deleteSolicitud);
// desactivar un comercio
router.delete('/comercios/delete/:idComercio', [
    verificarToken,
    verificarAdministrador,
    check('idComercio', 'El IdComercio debe ser MongoID').isMongoId(),
    validarCampos
], desactivateComercio);
// desactivar un consumidor
router.delete('/consumidor/delete/:idConsumidor', [
    verificarToken,
    verificarAdministrador,
    check('idConsumidor', 'El idConsumidor debe ser MongoID').isMongoId(),
    validarCampos
], desactivateConsumidor);
//#endregion

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

router.post('/email', sendEmailCtrl);
// mostrar todas las categorias
router.get('/categorias/get', [
    verificarToken
], getCategorias);

module.exports = router;