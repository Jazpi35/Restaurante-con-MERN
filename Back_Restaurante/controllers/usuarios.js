const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const fs = require("fs/promises");
const path = require("path");
//Importo el modelo de usuario 
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res) => {
    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const usuarios = await Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        res.json({
            total: usuarios.length,
            usuarios
        });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
};

const usuariosPost = async (req, res = response) => {

    try {
        const { correo, nombre, password, rol, estado } = req.body;
        const usuario = new Usuario({ correo, nombre, password, rol, estado });
        // console.log(user, nombre, password, rol);

        //Encriptar contraseña
        //Esta funcion permite encryptar la contraseña
        //genSaltSync() son las vueltas que deben de dar para desencriptar
        //por defecto viene en 10 se puede agrandar pero se demora mas en resolver
        const salt = bcryptjs.genSaltSync();
        //Aqui la encrypto
        //hashSync sirve para encryptar en una sola via 
        // y me pide la contraseña y el numero de vueltas
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardo el usuario
        await usuario.save();

        res.status(201).json({
            msg: 'Usuario Creado Correctamente',
            usuario
        });
    } catch (error) {
        console.error("❌ Error al registrar el usuario:", error);
        res.status(500).json({
            message: "❌ Error al registrar el usuario",
        });

    }
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    console.log(id);

    try {

        const { id } = req.params;

        //Fisicamente lo borramos <---> No recomendado
        //const usuario = await Usuario.findByIdAndDelete( id );

        // Suguerido para mantener la integridad de la informacion
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

        // de la req miro cual es mi usuario autenticado
        //const usuarioAutenticado = req.usuario;

        res.status(201).json({
            msg: 'Usuario Eliminado Correctamente',
            usuario
        });
    } catch (error) {
        console.error("❌ Error al eliminar el cliente:", error);
        res.status(500).json({
            message: "❌ Error 500 al eliminar el cliente",
        });
    }
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete
}
