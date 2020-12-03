const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

let adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    fechaCreacion: {
        type: Date
    }
});

adminSchema.pre('save', function(next){
    this.fechaCreacion = new Date().toUTCString();
    next();
});

adminSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

adminSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Admin', adminSchema);