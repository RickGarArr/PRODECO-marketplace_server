const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(500).json({
            ok: false,
            err: errores.array()
        });
    }
    next();
}

module.exports = {
    validarCampos
}