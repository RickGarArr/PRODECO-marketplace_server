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
    },
    administrador: {
        type: Schema.Types.ObjectId,
        required: [true, 'El usuario quien la creo es necesario']
    },
    activo: {
        type: Boolean,
        required: [true, 'El campo activo es requerido'],
        default: true
    }
});

categoriaSchema.method('toJSON', function(){
    const { __v, _id, administrador,...object } = this.toObject();
    object.id = _id;
    return object;
});

categoriaSchema.plugin(uniqueValidator, {message: '{PATH} ya esta registrado'});

module.exports = mongoose.model('Categorias', categoriaSchema);
