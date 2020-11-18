const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidadStock: {
        type: Number
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
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
    }]
});

module.exports = mongoose.model('Productos', productoSchema);