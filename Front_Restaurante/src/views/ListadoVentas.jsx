import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListadoVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [valorTotalTodasLasVentas, setValorTotalTodasLasVentas] = useState(0);

  useEffect(() => {
    const obtenerListVentas = async () => {
      try {
        const response = await fetch(
          "https://restaurante-con-mern.vercel.app/api/ventas"
        );
        const data = await response.json();
        setVentas(data.ventas);
        calcularValorTotalVentas(data.ventas);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };
    obtenerListVentas();
  }, []);

  const calcularValorTotalVentas = (ventas) => {
    let valorTotalVentas = 0;
    ventas.forEach(venta => {
      venta.productos.forEach(producto => {
        valorTotalVentas += producto.precio * producto.cantidad;
      });
    });
    setValorTotalTodasLasVentas(valorTotalVentas);
  };

  if (ventas.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h1>Listado de Ventas</h1>
      </div>

      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID Venta</th>
              <th scope="col">Producto</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Valor Unidad</th>
              <th scope="col">Valor Total Producto</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(venta => (
              venta.productos.map((producto, index) => (
                <tr key={index}>
                  {index === 0 && <td rowSpan={venta.productos.length}>{venta._id}</td>}
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>$ {producto.precio}</td>
                  <td>$ {producto.precio * producto.cantidad}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>

        <p>Valor total de ventas: <strong>$ {valorTotalTodasLasVentas}</strong></p> 

        <Link to="/Admin">
          <button className="btn btn-secondary">Regresar</button>
        </Link>
      </div>
    </div>
  );
};

export default ListadoVentas;
