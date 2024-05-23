const { response, request } = require('express');
const fs = require("fs/promises");
const path = require("path");
const Producto = require('../models/producto');

// Crear un nuevo producto
const crearProducto = async (req, res) => {

  try {

    const { productoN, precio, estado } = req.body;
    
    // Valido si existe un producto con ese productoN
    const productoDB = await Producto.findOne({ productoN });
    //const categoriaDB = await Categoria.findOne ({productoN});

    // Validamos que el producto no exista. SI existe
    if (productoDB) {
      return res.status(400).json({
        msg: `El producto ${productoDB.productoN}, ya existe`
      });
    }
    // Validamos que la categoria exista
    /*if ( !categoriaDB ) {
        return res.status(400).json({
            msg: `El producto ${productoDB.productoN}, ya existe`
        });
    }*/
    console.log(productoN,precio,estado);
    //Genero la data a guardar
    
    const producto = new Producto({ productoN , precio, estado });
    
   //Guardar en BD
    await producto.save();

    res.status(201).json({
      msg: 'Producto Creado Correctamente',
      producto
    });


  } catch (error) {
    console.error("❌ Error al registrar el Producto:", error);
    res.status(500).json({
      message: "❌ Error al registrar el Producto",
    });
  }
};

// Consulta todos los productos
const obtenerProductos = async (req, res) => {
  const { limite = 15, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    // Ejecutamos las promesas en paralelo para mejorar el rendimiento
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      total,
      productos // Cambiado de 'Producto' a 'productos'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener productos'
    });
  }
};

// Eliminar producto existente
const eliminarProducto = async (req, res) => {

  try {

      const { id } = req.params;
      console.log(id);
      //Fisicamente lo borramos <---> No recomendado
      //const usuario = await Usuario.findByIdAndDelete( id );

      // Suguerido para mantener la integridad de la informacion
      const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

      // de la req miro cual es mi usuario autenticado
      //const usuarioAutenticado = req.usuario;

      res.status(201).json({
          msg: 'Producto Eliminado Correctamente',
          producto
      });
  } catch (error) {
      console.error("❌ Error al eliminar el producto:", error);
      res.status(500).json({
          message: "❌ Error 500 al eliminar el producto",
      });
  }
};


module.exports = {
  crearProducto,
  obtenerProductos,
  eliminarProducto
}