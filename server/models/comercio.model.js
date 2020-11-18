const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let comercioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es requerido'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    idSolicitud: {
        type: Schema.Types.ObjectId,
        ref: 'Solicitudes'
    },
    fechaCreacion: {
        type: Date
    }
});

comercioSchema.pre('save', function(next){
    this.fechaCreacion = new Date().toUTCString();
    next();
});

comercioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Comercios', comercioSchema);