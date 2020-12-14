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
    imgPerfil: {
        type: String,
        default: 'no-image.png'
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    solicitud: {
        type: Schema.Types.ObjectId,
        ref: 'Solicitudes',
        required: [true, 'El idSolicitud es requerido es requerido']
    },
    activo: {
        type: Boolean,
        required: [true, 'El campo activo (true/false) es requerido'],
        default: true
    },
    fechaCreacion: {
        type: Date
    }
});

comercioSchema.pre('save', function(next){
    this.fechaCreacion = new Date().toUTCString();
    next();
});

comercioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

comercioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Comercios', comercioSchema);