import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ListadoUsuarios = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

useEffect(() => {
    const obtenerListUsers = async () => {
      try {
        const response = await fetch(
          `https://restaurante-con-mern.vercel.app/api/usuarios`
        );
        
        const data = await response.json();
        if (data && data.usuarios) {
          console.log(data);
          setUsuarios(data.usuarios);
        } else {
          console.error("La respuesta del servidor no tiene la estructura esperada.");
        }
      } catch (error) {
        console.error("Error al obtener los Usuarios:", error);
      }
    };
    obtenerListUsers();
  }, []);


  const handleEliminar = async (_id) => {
 
    try {
      console.log("enviando delete Usuario = ", _id);
      const response = await fetch(
        `https://restaurante-con-mern.vercel.app/api/usuarios/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUsuarios(usuarios.filter(usuario => usuario._id !== _id));
        Swal.fire({
          title: "Usuario Eliminado Exitosamente!",
          text: "Este usuario fue eliminado!",
          icon: "success"
        });
        //console.log("✅ Usuario eliminado exitosamente");
      } else if (response.status === 404) {
        //setMensajeRespuesta("❌ Usuario no encontrado. Ingrese un usuario válido");
        //console.log("❌ Usuario no encontrado");
        Swal.fire({
          title: "Usuario no encontrado!",
          text: "Por favor seleccione un usuario valido!",
          icon: "error"
        });
      } else {
        setMensajeRespuesta("❌ Error al eliminar el Usuario 1");
        console.log("❌ Error al eliminar el Usuario 1");
      }
    } catch (error) {
      setMensajeRespuesta("❌ Error al eliminar el Usuario 2 ");
      console.log("❌ Error al eliminar el Usuario 2");
    }

  };


  if (usuarios.length === 0) {
    return <p>Cargando...</p>;
  }

  return (

    <div className="card">
      <div className="card-header">
        <h1>Listado de Usuarios</h1>
      </div>

      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Correo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Rol</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(({ _id, correo, nombre, rol }) => (
              <tr key={_id}>
                <td>{correo}</td>
                <td>{nombre}</td>
                <td>{rol == "ADMIN_ROLE" ? "Administrador" : "Mesero"}</td>
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

export default ListadoUsuarios;
