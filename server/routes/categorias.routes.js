const express = require('express');
const Categoria = require('../models/categoria.model');

let app = express();

app.post('/categoria/crear', function(req, res){
    let body = req.body;

    let categoria = new Categoria({
        titulo: body.titulo,
        descripcion: body.descripcion
    });

    categoria.save().then(categoriaDB => {
        res.json({
            categoriaDB
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err
        });
    });

});

app.get('/categoria', function(req, res){
    Categoria.find()
    .sort('titulo')
    .exec()
    .then( categoriasDB => {
        res.json({
            ok: true,
            categoriasDB
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err
        });
    })
});
module.exports = app;