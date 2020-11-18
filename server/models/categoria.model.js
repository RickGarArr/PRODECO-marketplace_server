const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es requerido'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    }
});

categoriaSchema.plugin(uniqueValidator, {message: '{PATH} ya esta registrado'});

module.exports = mongoose.model('Categorias', categoriaSchema);
