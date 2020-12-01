const Direccion = require('../models/direccion.model');
const Consumidor = require('../models/consumidor.model');

const postDireccion = async (req, res) => {
    try {
        const uid = req.uid;
        console.log(uid);
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
const deleteDireccion = async (req, res) => {
    try {
        const uid = req.params.id;
        const idDireccion = req.body.direccion;
        const consumidorDB = await Consumidor.findByIdAndUpdate(uid, {$pull: { 'direcciones': idDireccion }}, {new: true});
        if (!consumidorDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El Consumidor no existe en la base de datos'
            });
        }
        await Direccion.findByIdAndRemove(idDireccion);
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
const getDirecciones = async (req, res) => {
    try {
        const id = req.params.id;
        const consumidorDB = await Consumidor.findById(id).populate('direcciones', '-__v');
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

module.exports = {
    postDireccion,
    deleteDireccion,
    getDirecciones
}