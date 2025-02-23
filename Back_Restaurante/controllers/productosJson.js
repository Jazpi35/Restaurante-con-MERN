const { response, request } = require('express');
const fs = require("fs/promises");
const path = require("path");
const  Producto  = require ('../models/producto');

// Crear un nuevo producto
const crearProducto = async (req, res) => {

  const { id, valor, estado } = req.body;

  //console.log("estoy recibiendo: ", id , producto, valor, estado);
  const producto = req.body.producto.toUpperCase();

  try {

    // Leo el archivo productos.json para obtener la lista actual de productos
    const productosList = await fs.readFile(
      path.join(__dirname, "../data/productos.json"),
      "utf-8"
    );

    const productosData = JSON.parse(productosList);

    // Creo un nuevo objeto para el producto
    const nuevoProducto = {
      id,
      producto,
      valor,
      estado
    };

    // Agrega el nuevo producto a la lista
    productosData.productos.push(nuevoProducto);

    // Escribe la lista actualizada en el archivo productos.json
    await fs.writeFile(
      path.join(__dirname, "../data/productos.json"),
      JSON.stringify(productosData, null, 2),
      "utf-8"
    );

    res.json({
      message: "✅ Registro creado exitosamente",
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
      Producto // Cambiado de 'Producto' a 'productos'
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
  const { id } = req.params;

  try {
    console.log("Producto a cambiar de estado:", id);

    // Lee el archivo productos.json para obtener la lista actual de productos
    const productosList = await fs.readFile(
      path.join(__dirname, '../data/productos.json'),
      'utf-8'
    );

    const productosData = JSON.parse(productosList);
    const producto = productosData.productos.find(prodp => prodp.id === id);

    if (!producto) {
      console.log("Producto no encontrado en la lista.");
      return res.status(404).json({
        message: '❌ Producto no encontrado (backend)',
      });
    }

    // Cambia el estado del producto de true a false
    producto.estado = false;

    // Convierte los datos de nuevo a formato JSON
    const updatedData = JSON.stringify(productosData, null, 2);

    // Escribe los datos actualizados de vuelta al archivo productos.json
    await fs.writeFile(
      path.join(__dirname, '../data/productos.json'),
      updatedData,
      'utf-8'
    );

    return res.status(200).json({
      message: '✅ producto eliminado correctamente',
      updatedProduct: producto,
    });
  } catch (error) {
    return res.status(500).json({
      message: '❌ Error al eliminar el estado del producto',
      error: error.message,
    });
  }
};


module.exports = {
  crearProducto,
  obtenerProductos,
  eliminarProducto
}