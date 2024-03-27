const { response } = require('express');
const fs = require("fs/promises");
const path = require("path");

const emailExiste = async (correo = '') => {
    
        const allemail = await fs.readFile(path.join(__dirname, "../data/users.json"));
        const userArray = JSON.parse(allemail).usuarios; // Accede a la propiedad "usuarios"
        // Valida que el correo exista
        const existeEmail = userArray.some(user => user.user == correo);

        //console.log("correo a buscar:",correo);
        //console.log("correo encontrado", existeEmail);

        if (existeEmail) {
            throw new Error(`El correo: ${correo}, ya esta registrado en la BD`)
        }


}

const productoExiste = async ( producto1 = '') => {
    
    const allproduct = await fs.readFile(path.join(__dirname, "../data/productos.json"));
    const userArray = JSON.parse(allproduct).productos; // Accede a la propiedad "usuarios"
    // Valida que el correo exista
    const existeProducto = userArray.some(producto => producto.producto == producto1 );

    //console.log("correo a buscar:",correo);
    //console.log("correo encontrado", existeEmail);

    if (existeProducto) {
        throw new Error(`El producto: ${producto1}, ya esta registrado en la BD`)
    }

}

const esRoleValido = async (rol = '') => {

    const allRole = await fs.readFile(path.join(__dirname, "../data/users.json"));
    const userArray = JSON.parse(allRole).usuarios; // Accede a la propiedad "usuarios"

    // valido que el correo no exista
    const existeRole = userArray.some(user => user.correo === correo);

    if (!existeRole) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    productoExiste
}