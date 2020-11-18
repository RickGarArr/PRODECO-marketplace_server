const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let consumidorSchema = new Schema({
    fechaCreacion: {
        type: Date
    },
    nombre: {
        type: String,
        required: [true, 'El Nombre Es Obligatorio']
    },
    apellidoPat: {
        type: String,
        required: [true, 'El Apellido Es Obligatorio']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'El Correo es Obligatorio']
    },
    curp: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    direcciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Direcciones'
    }],
    compras: [{
        type: Schema.Types.ObjectId,
        ref: 'Compras'
    }]
});

consumidorSchema.pre('save', function(next){
    this.fechaCreacion = new Date().toUTCString();
    next();
});
consumidorSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Consumidores', consumidorSchema);