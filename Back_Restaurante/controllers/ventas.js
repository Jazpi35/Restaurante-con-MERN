const fs = require("fs/promises");
const path = require("path");


// Crear una venta
const crearVenta = async (req, res) => {
    try {

      //Desestructuro lo que trae 
      const { id, producto, cantidad } = req.body;

      console.log("Venta a crear: ", id, " ", producto, " ", cantidad)
  
      // Lee el archivo productos.json para obtener la lista actual de ventas
      const ventasList = await fs.readFile(
        path.join(__dirname, "../data/ventas.json"),
        "utf-8"
      );
      const ventasData = JSON.parse(ventasList);
  
      // Crea un nuevo objeto para el producto
      const nuevaVenta = {
        id,
        producto,
        cantidad,
      };
  
      // Agrega el nuevo producto a la lista
      ventasData.ventas.push(nuevaVenta);
  
      // Escribe la lista actualizada en el archivo productos.json
      await fs.writeFile(
        path.join(__dirname, "../data/ventas.json"),
        JSON.stringify(ventasData, null, 2),
        "utf-8"
      );
  
      res.json({
        message: "✅ Registro creado exitosamente",
      });
    } catch (error) {
      console.error("❌ Error al registrar la Venta (backend):", error);
      res.status(500).json({
        message: "❌ Error al registrar la Venta (backend)",
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