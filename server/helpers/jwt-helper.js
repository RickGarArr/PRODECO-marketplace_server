const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    return new Promise((resolve, reject) => {
        jwt.sign(uid, process.env.JWT_SECRET, {expiresIn: '48h'}, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

const generarJWTSolicitud = ( payload ) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '48h'}, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT,
    generarJWTSolicitud
}