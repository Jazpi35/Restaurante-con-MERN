import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../App.css';

const CrearVenta = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [pedido, setPedido] = useState([]);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      const response = await fetch("https://restaurante-con-mern.vercel.app/api/productos");
      const data = await response.json();
      setProductos(data.productos);
    };

    const obtenerMesas = async () => {
      const response = await fetch("https://restaurante-con-mern.vercel.app/api/mesas");
      const data = await response.json();
      setMesas(data.mesas);
    };

    obtenerProductos();
    obtenerMesas();
  }, []);

  const agregarProducto = () => {
    if (productoSeleccionado && cantidad) {
      const productoExistente = pedido.find(item => item.productoId === productoSeleccionado);
      if (productoExistente) {
        const pedidoActualizado = pedido.map(item =>
          item.productoId === productoSeleccionado
            ? { ...item, cantidad: item.cantidad + parseInt(cantidad) }
            : item
        );
        setPedido(pedidoActualizado);
      } else {
        const producto = productos.find(p => p._id === productoSeleccionado);
        const nuevoProducto = {
          productoId: producto._id,
          nombre: producto.productoN,
          cantidad: parseInt(cantidad),
          precio: producto.precio
        };
        setPedido([...pedido, nuevoProducto]);
      }
      setProductoSeleccionado("");
      setCantidad("");
    } else {
      Swal.fire({
        title: "Diligencia los campos!",
        text: "Por favor completa los campos para continuar!",
        icon: "error"
      });
    }
  };

  const crearVenta = async () => {
    if (pedido.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "No has agregado productos.",
        icon: "error"
      });
      return;
    }

    const total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    try {
      const response = await fetch("https://restaurante-con-mern.vercel.app/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mesa: mesaSeleccionada || null,
          productos: pedido,
          total: total,
          estado: "pendiente",
          fecha: new Date()
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Pedido Enviado Exitosamente!",
          text: "Por favor espere en su mesa!",
          icon: "success"
        });
        setPedido([]);
        setMesaSeleccionada("");
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
      <div className="card">
        <h3>Crear Venta</h3>

        <select
          className="form-select"
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productos.map((producto) => (
            <option key={producto._id} value={producto._id}>
              {producto.productoN}
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
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <button className="btn btn-primary" onClick={agregarProducto}>
          Agregar Producto
        </button>

        <div>
          <Link to="/ListadoCocina">
            <button className="btn btn-secondary">Listado Cocina</button>
          </Link>
          <Link to="/">
            <button className="btn btn-secondary">Regresar</button>
          </Link>
          <button className="btn btn-success" onClick={crearVenta}>Crear Venta</button>
        </div>
      </div>

      <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {pedido.map((item) => (
              <tr key={item.productoId}>
                <td>{item.cantidad}</td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>{item.precio * item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
    </div>
  );
};

export default CrearVenta;
