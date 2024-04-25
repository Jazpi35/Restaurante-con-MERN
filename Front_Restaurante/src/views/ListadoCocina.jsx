import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListadoCocina = () => {

  const [pedidos, setPedidos] = useState([]);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

useEffect(() => {
    const obtenerListPedidos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3500/api/pedidos/`
        );
        
        const data = await response.json();
        if (data && data.pedidos) {
          console.log(data.pedidos);
          setPedidos(data.pedidos);
        } else {
          console.error("La respuesta del servidor no tiene la estructura esperada.");
        }
      } catch (error) {
        console.error("Error al obtener los Pedidos:", error);
      }
    };
    obtenerListPedidos();
  }, []);


  const handleEntregar = async (id) => {
 
    try {
      console.log("enviando delete Usuario = ", id);
      const response = await fetch(
        `http://localhost:3500/api/usuarios/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        setMensajeRespuesta("✅ Pedido Terminado exitosamente");
        console.log("✅ Pedido Terminado exitosamente");
      } else if (response.status === 404) {
        setMensajeRespuesta("❌ Pedido no encontrado. Ingrese un pedido válido");
        console.log("❌ Pedido no encontrado");
      } else {
        setMensajeRespuesta("❌  Error al Finalizar la entrega 1");
        console.log("❌ Error al Finalizar la entrega 1");
      }
    } catch (error) {
      setMensajeRespuesta("❌ Error al Finalizar la entrega ");
      console.log("❌ Error al Finalizar la entrega 2");
    }

  };


  if (pedidos.length === 0) {
    return <p>Cargando...</p>;
  }

  return (

    <div className="card">
      <div className="card-header">
        <h1>Listado de Pedidos</h1>
    </div>

      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
            <th scope="col">id_prueba</th>
              <th scope="col">Mesa</th>
              <th scope="col">Producto</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(({ id, mesa, producto, estado }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{mesa}</td>
                <td>{producto}</td>
                <td>{estado}</td>
                <td>
                   <button className="btn btn-danger" onClick={() => handleEntregar(id)}>
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
        <Link to="/">
          <button className="btn btn-secondary">Regresar</button>
        </Link>
      </div>
    </div>
  );
};

export default ListadoCocina;
