import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../App.css';

const ListadoCocina = () => {
    const [ventas, setVentas] = useState([]);
  
    useEffect(() => {
      const obtenerVentas = async () => {
        const response = await fetch("http://localhost:3500/api/ventas");
        const data = await response.json();
        setVentas(data.ventas);
      };
  
      obtenerVentas();
    }, []);
  
    const actualizarEstadoVenta = async (id, nuevoEstado) => {
      try {
        const response = await fetch(`https://restaurante-con-mern.vercel.app/api/ventas${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: nuevoEstado
          }),
        });
  
        if (response.ok) {
          Swal.fire({
            title: "Estado Actualizado!",
            text: "El estado de la venta ha sido actualizado.",
            icon: "success"
          });
          setVentas(ventas.map(venta => venta._id === id ? { ...venta, estado: nuevoEstado } : venta));
        } else {
          Swal.fire({
            title: "Error!",
            text: "No se pudo actualizar el estado de la venta.",
            icon: "error"
          });
        }
      } catch (error) {
        console.error("❌ Error al actualizar el estado de la venta:", error);
      }
    };
  
    return (
      <div className="card">
        <h1>Módulo Cocina</h1>
        <div className="card">
          <h3>Pedidos Pendientes</h3>
  
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Mesa</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta._id}>
                  <td>{venta.mesa || "Sin mesa"}</td>
                  <td>
                    {venta.productos.map((producto) => (
                      <div key={producto.productoId}>
                        {producto.cantidad} x {producto.nombre}
                      </div>
                    ))}
                  </td>
                  <td>{venta.total}</td>
                  <td>{venta.estado}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => actualizarEstadoVenta(venta._id, "terminada")}
                    >
                      Terminado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Link to="/">
            <button className="btn btn-secondary">Regresar al Login</button>
          </Link>
          <Link to="/CrearVenta">
            <button className="btn btn-primary">Crear Venta</button>
          </Link>
        </div>
      </div>
    );
};

export default ListadoCocina;
