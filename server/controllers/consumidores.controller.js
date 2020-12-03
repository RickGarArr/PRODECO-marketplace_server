const Direccion = require('../models/direccion.model');
const Consumidor = require('../models/consumidor.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helper');

// registrar un nuevo consumidor
const registerConsumidor = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync();
        const {nombre, apellidoPat, telefono, email, password} = req.body;
        let consumidor = new Consumidor({
            nombre,
            apellidoPat,
            email,
            telefono,
            password: bcrypt.hashSync(password, salt)
        });
    
        const consumidorDB = await consumidor.save();
        const jwt = await generarJWT({uid: consumidorDB.id});
        res.json({
            ok: true,
            // consumidorDB,
            token: jwt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }


}
// Registrar una direccion de contacto
const createDireccion = async (req, res) => {
    try {
        const uid = req.uid;
        const consumidorDB = await Consumidor.findById(uid);
        if(!consumidorDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El Usuario no existe'
            })
        }
        const direccion = new Direccion(req.body);
        await direccion.save();

        consumidorDB.direcciones.unshift(direccion.id);
        await consumidorDB.save();
        res.json({
            ok: true,
            direccion
        });
    } catch (error) {
        console.log(error);
    }
}
// Eliminar una direccion de contacto
const deleteDireccion = async (req, res) => {
    try {
        const uid = req.uid;
        const idDireccion = req.params.idDireccion;
        await Direccion.findByIdAndDelete(idDireccion);
        const consumidorDB = await Consumidor.findByIdAndUpdate(uid, {$pull: { 'direcciones': idDireccion }}, {new: true});
        if (!consumidorDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El Consumidor no existe en la base de datos'
            });
        }
        res.json({
            ok: true,
            msg: 'Direccion Eliminada'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
// Mostrar todas las direcciones de un consumidor
const getDirecciones = async (req, res) => {
    try {
        const idConsumidor = req.uid;
        const consumidorDB = await Consumidor.findById(idConsumidor).populate('direcciones', '-__v');
        if (!consumidorDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El Usuario no existe'
            });
        }
        res.json({
            ok: true,
            direcciones: consumidorDB.direcciones
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
// Editar una direccion
const updateDireccion = async (req, res) => {
    try {
        const idConsumidor = req.uid;
        const idDireccion = req.params.idDireccion;

        const [consumidorDB, newDireccion ] = await Promise.all([
            Consumidor.findById(idConsumidor),
            Direccion.findByIdAndUpdate(idDireccion, req.body, {new: true})
        ]);
        if (!consumidorDB) {
            return  res.status(500).json({
                ok: false,
                msg: 'El consumidor no existe en la base de datos'
            });
        }
        if (!newDireccion) {
            return res.status(500).json({
                ok: false,
                msg: 'La direccion no existe en la base de datos'
            });
        }
        res.json({
            ok: true,
            newDireccion
        });
    } catch (error) {
        console.log(error);
    }
}

const getConsumidores = async (req, res) => {
    try {
        const consumidoresDB = await Consumidor.find();
        res.json({
            ok: true,
            consumidoresDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }
}


module.exports = {
    registerConsumidor,
    getConsumidores,
    createDireccion,
    deleteDireccion,
    getDirecciones,
    updateDireccion
}