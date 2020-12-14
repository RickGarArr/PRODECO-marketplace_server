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
        required: [true, 'El Correo es Obligatorio'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El Telefono es Obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la Contraseña es Obligatorio'],
    },
    direcciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Direcciones'
    }],
    compras: [{
        type: Schema.Types.ObjectId,
        ref: 'Compras'
    }],
    activo: {
        type: Boolean,
        required: [true, 'El campo activo (true/false) es requerido'],
        default: true
    },
});

consumidorSchema.pre('save', function(next){
    this.fechaCreacion = new Date().toUTCString();
    next();
});

consumidorSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

consumidorSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Consumidores', consumidorSchema);