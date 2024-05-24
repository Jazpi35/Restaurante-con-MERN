import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  
  useEffect(() => {
    const obtenerListProduct = async () => {
      try {
        const response = await fetch(
          "https://restaurante-con-mern.vercel.app/api/productos"
        );
        
        const data = await response.json();
        if (data && data.productos) {
          console.log(data.productos);
          setProductos(data.productos);
        } else {
          console.error("La respuesta del servidor no tiene la estructura esperada.");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    obtenerListProduct();
  }, []);


  const handleEliminar = async (_id) => {

    try {
      console.log("enviando delete Producto = ", _id);
      
      const response = await fetch(
        `https://restaurante-con-mern.vercel.app/api/productos/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setProductos(productos.filter(producto => producto._id !== _id));
        setMensajeRespuesta("✅ Producto eliminado exitosamente");
        console.log("✅ Producto eliminado exitosamente");
      } else if (response.status === 404) {
        setMensajeRespuesta("❌ Producto no encontrado. Ingrese un usuario válido");
        console.log("❌ Producto no encontrado");
      } else {
        setMensajeRespuesta("❌ Error al eliminar el Producto 1");
        console.log("❌ Error al eliminar el Producto 1");
      }
    } catch (error) {
      setMensajeRespuesta("❌ Error al eliminar el Producto 2 ");
      console.log("❌ Error al eliminar el Producto 2");
    }

  };

  if (productos.length === 0) {
    return <p>Cargando...</p>;
  }

  return (

    <div className="card">
      <div className="card-header">
        <h1>Listado de Productos</h1>
        <h3>Restaurante</h3>
      </div>

      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Descripción Producto</th>
              <th scope="col">Valor $</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(({ _id, productoN, precio }) => (
              <tr key={_id}>
                <td>{productoN}</td>
                <td>$ {precio}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleEliminar(_id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
        <br />
        <Link to="/Admin">
          <button className="btn btn-secondary">Regresar</button>
        </Link>
      </div>
    </div>
  );
};

export default ListadoProductos