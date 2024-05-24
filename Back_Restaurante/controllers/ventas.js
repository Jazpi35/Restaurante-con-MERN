const fs = require("fs/promises");
const path = require("path");
const Venta = require('../models/venta');

// Crear una venta
const crearVenta = async (req, res) => {
  try {
    const { mesa, productos , estado } = req.body;

    // Calcula el total de la venta
    const total = productos.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    // Crea una nueva venta
    const nuevaVenta = new Venta({
      mesa: mesa || null,
      productos,
      total,
      estado,
      fecha: new Date()
    });

    // Guarda la venta en la base de datos
    const ventaGuardada = await nuevaVenta.save();

    res.status(201).json({
      msg: 'Venta creada correctamente',
      venta: ventaGuardada
    });
  } catch (error) {
    console.error("❌ Error al crear la venta:", error);
    res.status(500).json({
      message: "❌ Error al crear la venta",
      error: error.message
    });
  }
};


// Consultar todas las ventas
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('productos.productoId');
    res.status(200).json({ ventas });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las ventas", error });
  }

};

// Terminar Pedido
const ventaTerminada = async (req, res) => {

  const { id } = req.params;
  const { estado } = req.body;

  console.log(id);

  try {
    // Buscar la venta por su ID
    const venta = await Venta.findById(id);

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Actualizar el estado de la venta
    venta.estado = estado;
    await venta.save();

    res.status(200).json({ mensaje: 'Estado de la venta actualizado correctamente', venta });
  } catch (error) {
    console.error('Error al cambiar el estado de la venta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

};

module.exports = {
  crearVenta,
  obtenerVentas,
  ventaTerminada
}