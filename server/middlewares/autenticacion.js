const Consumidor = require('../models/consumidor.model');
const Admin = require('../models/admin.model');
const Comercio = require('../models/comercio.model');

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

verificarAdministrador = async (req, res, next) => {
    try {
        const idAdmin = req.uid;
        adminDB = await Admin.findById(idAdmin);
        if (!adminDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El token no pertenece a un Administrador'
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }

}

verificarComercio = async (req, res, next) => {
    try {
        const idComercio = req.uid;
        comercioDB = await Comercio.findById(idComercio);
        if (!comercioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El token no pertenece a un Comercio'
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    verificarToken,
    verificarConsumidor,
    verificarAdministrador,
    verificarComercio
}