let express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Comercio = require('../models/comercio.model');

let app = express();

let { verificaTokenSolicitud } = require('../middlewares/autenticacion');

app.get('/get-all', function(req, res) {
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

// app.post('/crete');

module.exports = app;