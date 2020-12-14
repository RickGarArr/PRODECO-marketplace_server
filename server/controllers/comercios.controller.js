const Comercio = require('../models/comercio.model');
const bcrypt = require('bcrypt');
const { crearDirectorio } = require('../helpers/files');

const registrarComercio = async (req, res) => {
    try {
        const { nombre, email, telefono, solicitud } = req.solicitud;
        const password = req.body.password;
        
        const salt = bcrypt.genSaltSync();
        const comercio = new Comercio({
            nombre,
            telefono,
            email,
            password: bcrypt.hashSync(password, salt),
            solicitud
        });
        const comercioDB = await comercio.save();
        
        const respDir = await crearDirectorio('comercios', comercioDB.id);
        res.json({
            ok: true,
            comercioDB,
            respDir
        });        
    } catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
}

const registrarProducto = async (req, res) => {
    const uid = req.uid;
    data = req.body;
    res.json({
        uid,
        data,
    });
}

module.exports = {
    registrarComercio,
    registrarProducto
}