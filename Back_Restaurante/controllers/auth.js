const { response } = require('express');
const bcryptjs = require('bcryptjs');
const fs = require("fs/promises");
const path = require("path");
Usuario = require('../models/usuario');
//const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo , password } = req.body;

    //console.log("lo que me llega:",correo,password);

    try {

        //Verifico si el email existe 
        //Invoco mi modelo y comparo el correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Correo'
            });
        }

        //Verifico si el estado del usuario es activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario /  estado: false '
            });
        }

        //Verifico la contraseña del usuario 
        //Con la funcion compareSync compara la contraseña enviada
        //Con la almacenada en la base de datos
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Passsword no son correctos - password'
            });
        }

        res.json({
            user: usuario.user,
            rol: usuario.rol,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }

}

module.exports = {
    login
};