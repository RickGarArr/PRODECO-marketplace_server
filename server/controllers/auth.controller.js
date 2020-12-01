const Consumidor = require('../models/consumidor.model');
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

module.exports = {
    loginConsumidor
}