import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Importa la librería UUID
import '../App.css'

const CrearVenta2 = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [pedido, setPedido] = useState([]);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      const response = await fetch(
        "http://localhost:3500/api/productos"
      );
      const data = await response.json();
      setProductos(data.productos);
    };

    const obtenerMesas = async () => {
      const response = await fetch(
        "http://localhost:3500/api/mesas"
      );
      const data = await response.json();
      setMesas(data.mesas);
    };

    obtenerProductos();
    obtenerMesas();
  }, []);

  const agregarProducto = () => {
    if (productoSeleccionado !== "" && cantidad !== "") {
      const nuevoProducto = {
        id: uuidv4(),
        producto: productoSeleccionado,
        cantidad: cantidad
      };
      console.log(nuevoProducto);
      setPedido([...pedido, nuevoProducto]);
      setProductoSeleccionado("");
      setCantidad("");
    } else {
      setMensajeRespuesta("❌ Debes seleccionar un producto y una cantidad");
    }
  };

  const enviarPedido = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/ventas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mesa: mesaSeleccionada,
            productos: pedido,
          }),
         }
      );
      if (response.ok) {
        setMensajeRespuesta("✅ Pedido enviado exitosamente");
        setPedido([]);
        setMesaSeleccionada("");
        console.log(pedido);
      } else {
        setMensajeRespuesta("❌ Error al enviar el pedido");
      }
    } catch (error) {
      console.error("❌ Error al enviar el pedido:", error);
      setMensajeRespuesta("❌ Error al enviar el pedido");
    }
  };

  return (
    <div className="card">
      <h1>Módulo Mesero</h1>
      <h2>Restaurante</h2>
      <div className="card">
        <h3>Crear Venta</h3>

        <select
          className="form-select"
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productos.map((producto, index) => (
            <option key={index} value={producto.producto}>
              {producto.producto}
            </option>
          ))}
        </select>
        
        <select
          className="form-select"
          value={mesaSeleccionada}
          onChange={(e) => setMesaSeleccionada(e.target.value)}
        >
          <option value="">Selecciona una mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.nombre}>
              {mesa.nombre}
            </option>
          ))}
        </select>

        <input
          className="form-control"
          type="number"
          placeholder="Cantidad..."
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <button className="btn btn-primary" onClick={agregarProducto}>
          Agregar Producto
        </button>

        <button className="btn btn-success" onClick={enviarPedido}>
          Enviar Pedido
        </button>

        <Link to="/">
          <button className="btn btn-secondary" >Regresar</button>
        </Link>
      </div>

      <div>
        {pedido.length > 0 && (
          <div>
            <h4>Pedido:</h4>
            <ul>
              {pedido.map((item) => (
                <li key={item.id}>
                  {item.cantidad} - {item.producto}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <br />
      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
    </div>
  );
};

export default CrearVenta2;