const Consumidor = require('../models/consumidor.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helper');

const postConsumidor = async (req, res) => {
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
        const token = generarJWT({uid: consumidorDB.id});
        res.json({
            ok: true,
            consumidorDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
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
    postConsumidor,
    getConsumidores
}