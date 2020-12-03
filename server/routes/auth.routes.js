const { Router } = require('express');
const { check } = require('express-validator');
const { loginConsumidor, loginComercio, loginAdmin } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

// login de un consumidor
router.post('/consumidor/login', [
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password es necesario').notEmpty(),
    validarCampos
], loginConsumidor);

// login de un comercio
router.post('/comercio/login', [
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password es necesario').notEmpty(),
    validarCampos
], loginComercio);

// login de un Admnistrador
router.post('/admin/login', [
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password es necesario').notEmpty(),
    validarCampos
], loginAdmin)
module.exports = router;