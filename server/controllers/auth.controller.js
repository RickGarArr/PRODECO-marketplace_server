const Consumidor = require('../models/consumidor.model');
const Comercio = require('../models/comercio.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helper');

const loginConsumidor = async (req, res) => {
    try {
        const {email, password} = req.body;
        const consumidorDB = await Consumidor.findOne({email: email});
        if (!consumidorDB) {
            return res.status(500).json({
                ok: false,
                msg: '{correo} y contraseña invalidos'
            });
        }
        const validPassword = bcrypt.compareSync(password, consumidorDB.password);
        if (!validPassword) {
            return res.status(500).json({
                ok: false,
                msg: 'correo y {contraseña} invalidos'
            });
        }
        const jwt = await generarJWT({uid: consumidorDB.id});

        res.json({
            ok: true,
            token: jwt
        });

    } catch (error) {
        console.log(error);
    }


}
const loginComerciante = async (req, res) => {
    try {
        const {email, password} = req.body;
        const comercioDB = await Comercio.findOne({email});
        if (!comercioDB) {
            return res.json({
                ok: false,
                msg: 'El {correo} y contraseña son invalidos'
            });
        }
        const validPassword = bcrypt.compareSync(password, comercioDB.password);
        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'El correo y {contraseña} son invalidos'
            });
        }
        const jwt = await generarJWT({uid: comercioDB.id});
        res.json({
            ok: true,
            token: jwt
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}
module.exports = {
    loginConsumidor,
    loginComerciante
}