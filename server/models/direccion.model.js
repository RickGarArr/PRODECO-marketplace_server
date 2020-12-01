const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let direccionSchema = new mongoose.Schema({
    activo: {
        type: Boolean,
        required: true,
        default: true
    },
    contacto : {
        nombre: {
            type: String,
            required: true
        },
        apellidoPat: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        }
    },
    domicilio: {
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
        },
        numExt: {
            type: String,
            required: true
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
        }
    }
});

module.exports = mongoose.model('Direcciones', direccionSchema);