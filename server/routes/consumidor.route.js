const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Consumidor = require('../models/consumidor.model');

let app = express();

app.get('/consumidor', function(req, res){
    Consumidor.find()
    .exec((err, consumidores) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                consumidores
            });
        }
    })
});

app.post('/consumidor/crear', async function(req, res){
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
                consumidorDB,
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
            consumidor: consumidorDB,
            token 
        });
    });
});
module.exports = app;