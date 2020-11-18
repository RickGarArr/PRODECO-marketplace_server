const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Consumidor = require('../models/consumidor.model');
const Direccion = require('../models/direccion.model');

let { verificaToken } = require('../middlewares/autenticacion');

let app = express();

app.get('/consumidor', function(req, res){
    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 15;

    Consumidor.find()
    .skip(desde)
    .limit(hasta)
    .exec((err, consumidores) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        } else {
            Consumidor.countDocuments((err, conteo) => {
                if (err) {
                    res.json({
                        ok: false,
                        err
                    });
                } else {
                    res.json({
                        ok: true,
                        totalLength: conteo,
                        mostrando: {
                            desde,
                            hasta
                        },
                        consumidores,
                    });
                }
            })
        }
    })
});

app.post('/consumidor/crear', function(req, res){
    let body = req.body;
    let password = body.password;
    if (body.password){
        password = bcrypt.hashSync(body.password, 7);
    }
    let consumidor = new Consumidor({
        nombre: body.nombre,
        apellidoPat: body.nombre,
        email: body.email,
        curp: body.curp,
        password
    });

    consumidor.save((err, consumidorDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        } else {
            let token = jwt.sign({consumidor: consumidorDB}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
            res.json({
                ok: true,
                // consumidorDB,
                token
            });
        }
    });
});

app.post('/consumidor/login', function(req, res){
    let body = req.body;
    if (!body.password){
        return res.status(500).json({
            ok: false,
            err: {
                message: 'La contraseña es necesaria'
            }
        })
    }
    Consumidor.findOne({email: body.email}, (err, consumidorDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        } else if (!consumidorDB){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El (Correo) o Contraseña son incorrecots'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, consumidorDB.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Correo o (Contraseña) son incorrecots'
                }
            });
        }

        let token = jwt.sign({usuario: consumidorDB}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok: true,
            // consumidor: consumidorDB,
            token 
        });
    });
});

app.post('/consumidor/direccion', verificaToken, function(req, res){
    let id = req.usuario._id;
    let body = req.body;

    Consumidor.findById(id, (err, consumidorDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!consumidorDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Usuario No existe'
                }
            });
        }

        let direccion = new Direccion({
            nombre: body.nombre,
            apellido: body.apellido,
            telefono: body.telefono,
            cp: body.cp,
            colonia: body.colonia,
            calle: body.calle,
            numInt: body.numInt,
            numExt: body.numExt,
            descripcion: body.descripcion,
            entreCalle1: body.entreCalle1,
            entreCalle2: body.entreCalle2
        });

        direccion.save((err, direccionDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            consumidorDB.direcciones.push(direccionDB.id);

            consumidorDB.save((err, consumidorDB)=> {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                consumidorDB.populate('direcciones', (err, consumidorDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        consumidorDB
                    });
                });
            });
        });
    });
});

module.exports = app;