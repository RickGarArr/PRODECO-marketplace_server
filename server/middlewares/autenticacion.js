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

module.exports = {
    verificaToken
}