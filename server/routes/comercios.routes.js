const { Router } = require('express');
// controladores
const { 
    registrarProducto,
    registrarComercio } = require('../controllers/comercios.controller');

// middlewares 3ros
const { check } = require('express-validator');
const expressFileUpload = require('express-fileupload');
// middlewares propios 
const { verificarTokenSolicitud, verificarComercio, verificarToken } = require('../middlewares/autenticacion');
const { validarCampos } = require('../middlewares/validar-campos');
const { verificarProducto } = require('../middlewares/verificar-producto');

// ------------ /comercios
const router = Router();
router.use(expressFileUpload());

router.post('/registrar/password', [
    verificarTokenSolicitud,
    check('password', 'El password es necesario').notEmpty(),
    validarCampos
], registrarComercio);

router.post('/productos/registrar', [
    verificarToken,
    verificarComercio,
    check('productoInfo', 'La informacion del producto es requerido').notEmpty(),
    validarCampos,
    verificarProducto,
    check('titulo', 'El titulo es necesario').notEmpty(),
    check('descripcion', 'El descripcion es necesario').notEmpty(),
    check('stock', 'El stock debe ser valor Int e igual o mayor que 0').isInt({min: 0}),
    check('precio', 'El precio es necesario').isNumeric(),
    check('categoria', 'El categoria es necesario').isMongoId(),
    check('principales', 'las categorias principales son necesarias al menos 2').isArray().notEmpty(),
    check('principales[*].titulo', 'el titulo de las caracteristicas es necesario').notEmpty(),
    check('principales[*].descripcion', 'la descripcion de las caracteristicas es necesario').notEmpty(),
    check('secundarias', 'las categorias secundarias son necesarias al menos 2').isArray().notEmpty(),
    check('secundarias[*].titulo', 'el titulo de las caracteristicas es necesario').notEmpty(),
    check('secundarias[*].descripcion', 'la descripcion de las caracteristicas es necesario').notEmpty(),
    validarCampos
],registrarProducto);
module.exports = router;