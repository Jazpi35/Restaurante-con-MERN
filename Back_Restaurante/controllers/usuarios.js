const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const fs = require("fs/promises");
const path = require("path");

const usuariosGet = async (req, res) => {
    const users = await fs.readFile(path.join(__dirname, "../data/users.json"));
    const usersJSON = JSON.parse(users);


    //console.log(usersJSON);
    // Filtra los usuarios con estado true
    const usuariosTrue = usersJSON.usuarios.filter(user => user.estado === true);
    // Convierto el objeto en JSon para enviar al front
    res.json({usuarios: usuariosTrue});
}

const usuariosPost = async (req, res = response) => {

    try {
        const { id,user, nombre, password, rol, estado } = req.body;
       // console.log(id,user, nombre, password, rol);


        // Lee el archivo users.json para obtener la lista actual de usuarios
        const usersList = await fs.readFile(
            path.join(__dirname, "../data/users.json"),
            "utf-8"
        );
        const usersData = JSON.parse(usersList);

        // Crea un nuevo objeto para el usuario
        const nuevoUsuario = {
            id,
            user,
            nombre,
            password,
            rol,
            estado,
        };

        //Encriptar contraseña
        //Esta funcion permite encryptar la contraseña
        //genSaltSync() son las vueltas que deben de dar para desencriptar
        //por defecto viene en 10 se puede agrandar pero se demora mas en resolver
        const salt = bcryptjs.genSaltSync();
        //Aqui la encrypto
        //hashSync sirve para encryptar en una sola via 
        // y me pide la contraseña y el numero de vueltas
        nuevoUsuario.password = bcryptjs.hashSync(password, salt);

        // Agrega el nuevo usuario a la lista
        usersData.usuarios.push(nuevoUsuario);

        // Escribe la lista actualizada en el archivo users.json
        await fs.writeFile(
            path.join(__dirname, "../data/users.json"),
            JSON.stringify(usersData, null, 2),
            "utf-8"
        );

        res.status(201).json({
            msg: 'Usuario Creado Correctamente',
            nuevoUsuario
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

        // Lee el archivo users.json para obtener la lista actual de usuarios
        const usuariosList = await fs.readFile(
            path.join(__dirname, "../data/users.json"),
            "utf-8"
        );

        const usersData = JSON.parse(usuariosList);
            
        //console.log("este es userdata:",usersData);


        // Busca el usuario por id y su index 
        const usersIndex = usersData.usuarios.findIndex((userp) => userp.id === id);

            
        console.log("este es users index: ",usersIndex);

        // el busca desde el cero en adelante si es menor no existe
        if (usersIndex === -1) {
            return res.status(404).json({
                message: "❌ Usuario no encontrado (back)",
            });
        }

        // Cambia el estado del usuario de true a false
        usersData.usuarios[usersIndex].estado = false;


        // Convierte los datos de nuevo a formato JSON
        const updatedData = JSON.stringify(usersData, null, 2);

        //console.log("este es actulizar data: ",updatedData);

        // Escribe los datos actualizados de vuelta al archivo users.json
        await fs.writeFile(
            path.join(__dirname, "../data/users.json"),
            updatedData,
            "utf-8"
        );

        return res.status(200).json({
            message: "✅ Usuario eliminado correctamente",
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
