const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let solicitudSchema = new Schema({
    fechaCreacion: {
        type: Date
    },
    nombre: {
        type: String,
        required: [true, 'El Nombre Es Obligatorio'],
    },
    telefono: {
        type: String,
        required: [true, 'El Telfono Es Obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo Es Obligatorio'],
        unique: true
    },
    rfc: {
        type: String
    },
    domicilio: {
        type: String
    },
    ine: {
        type: String
    } 
});

solicitudSchema.pre('save', function(next){
    this.fechaCreacion = new Date();
    next();
});

solicitudSchema.plugin( uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Solicitudes', solicitudSchema);