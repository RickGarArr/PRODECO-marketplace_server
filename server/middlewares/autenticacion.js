const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('x-token');

    jwt.verify(token, process.env.SEED, function(err, decoded){
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

let verificaTokenSolicitud = (req, res, next) => {
    let token = req.get('x-token');

    jwt.verify(token, process.env.SEED, function (err, decoded) {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        req.solicitud = decoded.solicitud;
        next();
    });
}

module.exports = {
    verificaToken,
    verificaTokenSolicitud
}