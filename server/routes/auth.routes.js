const { Router } = require('express');
const { check } = require('express-validator');
const { loginConsumidor, loginComerciante } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/consumidor/login', [
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password es necesario').notEmpty(),
    validarCampos
], loginConsumidor);

router.post('/comerciante/login', [
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password es necesario').notEmpty(),
    validarCampos
], loginComerciante);

module.exports = router;