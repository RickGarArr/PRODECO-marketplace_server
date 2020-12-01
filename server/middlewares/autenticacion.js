const Consumidor = require('../models/consumidor.model');

const { request } = require('express');
const jwt = require('jsonwebtoken');

let verificarToken = (req = request, res, next) => {
    let token = req.header('x-token');
    if (!token) {
        return res.status(500).json({
            ok: false,
            msg: 'No hay token en la solicitud'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'invalid JWT'
        });
    }
}

verificarConsumidor = async (req, res, next) => {
    try {
        const idConsumidor = req.uid;
        consumiodorDB = await Consumidor.findById(idConsumidor);
        if (!consumiodorDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El token no pertenece a un Consumidor'
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    verificarToken,
    verificarConsumidor
}