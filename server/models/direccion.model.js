const mongoose = require('mongoose');

let direccionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    cp: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    numInt: {
        type: String,
        required: true
    },
    numExt: {
        type: String
    },
    descripcion: {
        type: String,
        required: true
    },
    entreCalle1: {
        type: String,
        required: true
    },
    entreCalle2: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Direcciones', direccionSchema);