const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    productoN: {
        type: String,
        //Valido para que la informacion no se erronea
        require: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Productos', ProductoSchema);