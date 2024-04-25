const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema ({

    correo: {
        type: String,
        //Valido para que la informacion no se erronea
        require:[true, 'EL correo es obligatorio'],
        // Valida que el correo no este duplicado
        unique: true
    },    
    nombre: {
        type: String,
        //Valido para que la informacion no se erronea
        require:[true, 'El nombre es obligatorio']
    },
    password : {
        type: String,
        //Valido para que la informacion no se erronea
        require:[true, 'La contraseña es obligatoria']
    },
    rol : {
        type: String,
        //Valido para que la informacion no se erronea
        require:true
    },
    estado : {
        type: Boolean,
        default: true
    }

});

module.exports = model ( 'Usuarios', UsuarioSchema );