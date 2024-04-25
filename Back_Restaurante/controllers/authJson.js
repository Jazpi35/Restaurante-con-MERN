const { response } = require('express');
const bcryptjs = require('bcryptjs');
//const bcryptjs = require('bcryptjs');
const fs = require("fs/promises");
const path = require("path");
//const Usuario = require('../models/usuario');
//const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    //console.log("lo que me llega:",correo,password);

    try {
        const allUsers = await fs.readFile(path.join(__dirname, "../data/users.json"));
        const userArray = JSON.parse(allUsers).usuarios; // Accede a la propiedad "usuarios"
        const result = userArray.find(user => user.user === correo); // Busca el usuario

        //        console.log("esta es la contraseña", result.password);
        //        console.log("este es el password", password);
        if (!result.estado) {
            return res.status(401).json({
                msg: 'El usuario no tiene permisos para iniciar sesión'
            });
        }


        const validPassword = bcryptjs.compareSync(password, result.password);
        if (!validPassword) {
            return res.status(500).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        if (result) {
            res.json(result);
        } else {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Correo'
            });
        }

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