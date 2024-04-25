const { response, request } = require('express');
const fs = require("fs/promises");
const path = require("path");

// Crear un nuevo pedido
const crearPedidos = async (req, res) => {
  try {
    // Desestructura la información que llega del cuerpo de la solicitud
    const { productos } = req.body;

    // Lee el archivo pedidos.json para obtener la lista actual de pedidos
    const pedidosList = await fs.readFile(
      path.join(__dirname, "../data/pedidos.json"),
      "utf-8"
    );
    const pedidosData = JSON.parse(pedidosList);
    console.log(pedidosData);
    // Itera sobre cada producto en la lista de productos recibidos
    productos.forEach(producto => {
      // Verifica si ya existe una entrada para la mesa en el objeto pedidosData
      const mesaExistente = pedidosData.find(pedido => pedido.mesa === producto.mesa);

      if (mesaExistente) {
        // Si ya existe una entrada para la mesa, agrega el producto al array de productos
        mesaExistente.productos.push({
          id: producto.id,
          nombre: producto.producto,
          cantidad: parseInt(producto.cantidad)
        });
      } else {
        // Si no existe una entrada para la mesa, crea una nueva entrada
        pedidosData.push({
          mesa: producto.mesa,
          productos: [{
            id: producto.id,
            nombre: producto.producto,
            cantidad: parseInt(producto.cantidad)
          }]
        });
      }
    });

    // Escribe la lista actualizada en el archivo pedidos.json
    await fs.writeFile(
      path.join(__dirname, "../data/pedidos.json"),
      JSON.stringify(pedidosData, null, 2),
      "utf-8"
    );

    // Envía una respuesta exitosa al frontend
    res.status(200).json({
      message: "✅ Pedidos almacenados exitosamente",
      pedidos: pedidosData
    });

  } catch (error) {
    console.error("❌ Error al almacenar los pedidos:", error);
    // Envía una respuesta de error al frontend
    res.status(500).json({
      message: "❌ Error al almacenar los pedidos",
      error: error.message
    });
  }
};


// Consulta todos los pedidos
const obtenerPedidos = async (req, res) => {

  const pedidos = await fs.readFile(
    path.join(__dirname, "../data/pedidos.json")
  );
  const pedidosJSON = JSON.parse(pedidos);

  //console.log(usersJSON);
  // Filtra los pedidos con estado true
  const pedidosTrue = pedidosJSON.pedidos.filter(pedidos => pedidos.estado === true);

  // Convierto el objeto en JSon para enviar al front
  res.json({
    pedidos: pedidosTrue,

  });
  // Convierto el objeto en JSon para enviar al front
  res.status(201).json({
    msg: 'Aqui estan los pedidos'
  });
};

// Eliminar pedidos existentes
const eliminarPedidos = async (req, res) => {
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
  crearPedidos,
  eliminarPedidos,
  obtenerPedidos,
}