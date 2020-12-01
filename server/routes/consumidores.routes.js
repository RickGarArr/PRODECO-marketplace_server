const express = require('express');
const { getConsumidores, postConsumidor } = require('../controllers/consumidores.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
let { verificaToken } = require('../middlewares/autenticacion');


let router = express();

router.get('/get-all', getConsumidores);

router.post('/post', [
    check('nombre', 'El Nombre es Necesario').notEmpty(),
    check('apellidoPat', 'El Apellido Paterno es Necesario').notEmpty(),
    check('telefono', 'El Telefono es Necesario').notEmpty(),
    check('email', 'El Email es Necesario').isEmail(),
    check('password', 'La Contraseña es Necesaria').notEmpty(),
    validarCampos
], postConsumidor);

module.exports = router;