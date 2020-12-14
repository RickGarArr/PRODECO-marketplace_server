const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    activo: {
        type: Boolean,
        required: [true, 'El opcion activo (true, false) es necesaria'],
        default: true
    },
    comercio: {
        type: Schema.Types.ObjectId,
        ref: 'Comercios'
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenPrincipal: {
        type: String
    },
    stock: {
        type: Number
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias',
        required: true
    },
    imagenes: [{
        type: String,
        required: true
    }],
    principales: [{
        titulo: {
            type: String
        },
        descripcion: {
            type: String
        }
    }],
    secundarias: [{
        titulo: {
            type: String
        },
        descripcion: {
            type: String
        }
    }],
    fechaCreacion: {
        type: Date,
        required: true
    }
});

productoSchema.pre('save', function(next){
    this.fechaCreacion = new Date().toUTCString();
    next();
});

productoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Productos', productoSchema);