let express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Comercio = require('../models/comercio.model');

let app = express();

let { verificaTokenSolicitud } = require('../middlewares/autenticacion');

app.get('/comercio', function(req, res) {
    Comercio.find()
    .populate('idSolicitud')
    .exec((err, comerciosDB) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }
        res.json({
            comerciosDB
        });
    })
});

app.post('/comercio/crear', verificaTokenSolicitud, function (req, res){
    let password = req.body.password;
    solicitud = req.solicitud;

    if (password){
        password = bcrypt.hashSync(password, 7);
    }

    let comercio = new Comercio({
        nombre: solicitud.nombre,
        telefono: solicitud.telefono,
        email: solicitud.email,
        password: password,
        idSolicitud: solicitud.idSolicitud
    });

    comercio.save((err, comercioDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let token = jwt.sign({consumidor: consumidorDB}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
        
        res.json({
            ok: true,
            token
        });
    });
});

app.post('/comercio/login', function(req, res) {
    let body = req.body;
    if (!body.password){
        m
        return res.status(500).json({
            ok: false,
            err: {
                message: 'No se ingresó una contraseña'
            }
        })
    }

    if (!body.email){
        return res.status(500).json({
            ok: false,
            err: {
                message: 'No se ingresó una direccion de correo'
            }
        })
    }

    Comercio.findOne({email: body.email}, (err, comercioDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        } else if (!comercioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El -email- o contraseña no son validos'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, comercioDB.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Correo o (Contraseña) son incorrecots'
                }
            });
        }
        let token = jwt.sign({comercio: comercioDB}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok: true,
            comercio: comercioDB,
            token 
        });
    })
});

module.exports = app;