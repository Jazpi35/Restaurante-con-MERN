import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../App.css';

const ListadoCocina = () => {
    const [ventas, setVentas] = useState([]);
  
    useEffect(() => {
      const obtenerVentas = async () => {
        const response = await fetch("https://restaurante-con-mern.vercel.app/api/ventas");
        const data = await response.json();
        setVentas(data.ventas);
      };
  
      obtenerVentas();
    }, []);
  
    const handleEliminar = async (_id) => {
      console.log(_id); 
      try {
        console.log("enviando terminado venta = ", _id);
        const response = await fetch(
          `https://restaurante-con-mern.vercel.app/api/ventas/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          setVentas(ventas.filter(ventas => ventas._id !== _id));
          Swal.fire({
            title: "Pedido Terminado Exitosamente!",
            text: "Este pedido fue entregado!",
            icon: "success"
          });
          //console.log("✅ Usuario eliminado exitosamente");
        } else if (response.status === 404) {
          //setMensajeRespuesta("❌ Usuario no encontrado. Ingrese un usuario válido");
          //console.log("❌ Usuario no encontrado");
          Swal.fire({
            title: "Pedido no encontrado!",
            text: "Por favor seleccione un pedido valido!",
            icon: "error"
          });
        } else {
          setMensajeRespuesta("❌ Error al terminar venta 1");
          console.log("❌ Error al terminar venta 1");
        }
      } catch (error) {
        setMensajeRespuesta("❌ Error al terminar venta 2 ");
        console.log("❌ Error al terminar venta 2");
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
                      onClick={() => handleEliminar(venta._id,)}
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
