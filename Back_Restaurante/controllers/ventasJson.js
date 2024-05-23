const fs = require("fs/promises");
const path = require("path");


// Crear una venta
const crearVenta = async (req, res) => {
  try {
    // Desestructura la información que llega del cuerpo de la solicitud
    const { productos } = req.body;

    // Lee el archivo ventas.json para obtener la lista actual de ventas
    const ventasList = await fs.readFile(
      path.join(__dirname, "../data/ventas.json"),
      "utf-8"
    );
    const ventasData = JSON.parse(ventasList);

    // Itera sobre cada producto en la lista de productos recibidos
    productos.forEach(producto => {
      // Busca si ya existe una venta para el producto actual
      const ventaExistenteIndex = ventasData.ventas.findIndex(venta => venta.producto === producto.producto);

      if (ventaExistenteIndex !== -1) {
        // Si existe, actualiza la cantidad vendida
        ventasData.ventas[ventaExistenteIndex].cantidad += parseInt(producto.cantidad);
      } else {
        // Si no existe, crea una nueva entrada para la venta
        ventasData.ventas.push({
          id: producto.id,
          producto: producto.producto,
          cantidad: parseInt(producto.cantidad)
        });
      }
    });

    // Escribe la lista actualizada en el archivo ventas.json
    await fs.writeFile(
      path.join(__dirname, "../data/ventas.json"),
      JSON.stringify(ventasData, null, 2),
      "utf-8"
    );

    // Envía una respuesta exitosa al frontend
    res.status(200).json({
      message: "✅ Registro(s) creado(s) exitosamente",
      ventas: ventasData.ventas // Envía la lista actualizada de ventas
    });

  } catch (error) {
    console.error("❌ Error al registrar la Venta (backend):", error);
    // Envía una respuesta de error al frontend
    res.status(500).json({
      message: "❌ Error al registrar la Venta (backend)",
      error: error.message // Envía el mensaje de error al frontend
    });
  }
};


// Consultar todas las ventas
const obtenerVentas = async (req, res) => {
  // const ventas = await fs.readFile(path.join(__dirname, "./data/ventas.json"));
  // const ventasJSON = JSON.parse(ventas);
  // res.json(ventasJSON);

  try {
    // Leer los datos de ventas y productos
    const ventasData = await fs.readFile(path.join(__dirname, "../data/ventas.json"), "utf-8");
    const productosData = await fs.readFile(path.join(__dirname, "../data/productos.json"), "utf-8");

    // Parsear los datos JSON
    const ventasJSON = JSON.parse(ventasData);
    const productosJSON = JSON.parse(productosData);

    // Realizar la unión de datos
    const ventasConValores = ventasJSON.ventas.map((venta) => {
      const productoInfo = productosJSON.productos.find((producto) => producto.producto === venta.producto);

      if (productoInfo) {
        const vTotalVenta = parseInt(venta.cantidad, 10) * parseInt(productoInfo.valor, 10);
        return {
          ...venta,
          valorUnitario: productoInfo.valor,
          vTotalVenta,
        };
      } else {
        return venta;
      }
    });

    // Devolver los datos con la unión
    res.json({ ventas: ventasConValores });
  } catch (error) {
    console.error("❌ Error al consultar las ventas:", error);
    res.status(500).json({
      message: "❌ Error al consultar las ventas",
    });
  }


};

module.exports = {
  crearVenta,
  obtenerVentas
}