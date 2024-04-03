const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();//creamos la aplicacion de express
        this.port = process.env.PORT;//configuracion del puerto

        this.paths = {
            auth:  '/api/auth',//defino URL autenticacion - login
            mesas: '/api/mesas',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            ventas: '/api/ventas'
        }

        //Middlewares
        //Funcion que se ejecuta antes de llamar un controlador o seguir
        //Evita que cuando hay muchos errores no se nos dispare la ruta
        this.middlewares();
        //Rutas de aplicacion
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parceo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.mesas, require('../routes/mesas'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.ventas, require('../routes/ventas'));
    }

    listen() {
        this.app.listen(3500, () => {
            console.log('Servidor corriendo en puerto 3500');
        });
    }

}


module.exports = Server;