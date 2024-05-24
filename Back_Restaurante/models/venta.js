const { Schema, model } = require('mongoose');

const VentaSchema = Schema({
    mesa: {
        type: String,
        default: null // Permite ventas sin mesa
    },
    productos: [
        {
            productoId: {
                type: Schema.Types.ObjectId,
                ref: 'Productos',
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            cantidad: {
                type: Number,
                required: true
            },
            precio: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    estado : {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Ventas', VentaSchema);
