import "../styles/admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { v4 as uuidv4 } from "uuid"; // Importa la librería UUID

const Admin = () => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [producto, setProducto] = useState("");
  const [valor, setValor] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");



  // función Crear usuario
  const crearUsuario = async (e) => {
    e.preventDefault();

    if (correo !== "" && (rol !== "" || rol > 0)) {

      try {
        const response = await fetch(
          "http://localhost:3500/api/usuarios",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              correo,
              nombre,
              password,
              rol,
              estado: true,
            }),
          }
        );
        console.log(response.body);

        if (response.ok) {
          setMensajeRespuesta("✅ Registro creado exitosamente");
          // Limpia los campos del formulario
          setCorreo("");
          setNombre("");
          setPassword("");
          setRol("");
        } else {
          setMensajeRespuesta("❌ Error al registrar el Usuario");
        }
      } catch (error) {
        console.error("❌ Error al enviar el formulario:", error);
        setMensajeRespuesta("❌ Error al registrar el Usuario");
      }
    } else {
      setMensajeRespuesta("❌ Faltan campos por diligenciar");
    }
  };

  // función Crear producto
  const crearProducto = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    if (producto !== "" && valor !== "") {
      try {
        const response = await fetch(
          "http://localhost:3500/api/productos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              producto,
              valor,
              estado: true
            }),
          }
        );
        console.log(response.body);
        if (response.ok) {
          setMensajeRespuesta("✅ Registro creado exitosamente");
          // Limpia los campos del formulario
          setProducto("");
          setValor("");
        } else {
          setMensajeRespuesta("❌ Error al registrar el Producto");
        }
      } catch (error) {
        console.error("❌ Error al enviar el formulario:", error);
        setMensajeRespuesta("❌ Error al registrar el Producto");
      }
    } else {
      setMensajeRespuesta("❌ Faltan campos por diligenciar");
    }
  };

  return (

    <div className="card">
      <h2>Administrador</h2>
      <div className="card">
        <h3>Gestión de Usuarios</h3>
        <input
          className="form-control"
          value={correo}
          type="text"
          name=""
          id=""
          placeholder="ingresa el Correo"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          className="form-control"
          value={nombre}
          type="text"
          name=""
          id=""
          placeholder="ingresa el Nombre Completo"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="form-control"
          value={password}
          type="password"
          name=""
          id=""
          placeholder="ingrese su contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="form-select"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="0">Selecciona un Rol</option>
          <option value="ADMIN_ROLE">Administrador</option>
          <option value="Mesero">Mesero</option>
          <option value="COC_ROLE">Cocina</option>
        </select>

        <div>
          <button className="btn btn-success" onClick={crearUsuario}>
            Crear Nuevo
          </button>
          <Link to="/ListadoUsuarios">
            <button className="btn btn-info">Ver Usuarios</button>
          </Link>
        </div>
      </div>

      <br />

      <div className="card">
        <h3>Gestión de Productos</h3>
        <input
          className="form-control"
          value={producto}
          type="text"
          name=""
          id=""
          placeholder="ingresa el Producto..."
          onChange={(e) => setProducto(e.target.value)}
        />
        <input
          className="form-control"
          value={valor}
          type="number"
          name=""
          id=""
          placeholder="ingresa el valor..."
          onChange={(e) => setValor(e.target.value)}
        />
        <div>
          <button className="btn btn-success" onClick={crearProducto}>
            Crear Nuevo
          </button>
          <Link to="/ListadoProductos">
            <button className="btn btn-info">Ver Productos</button>
          </Link>
        </div>
      </div>
      <br />
      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
      <br />
      <div>
        <Link to="/">
          <button className="btn btn-secondary" type="button">
            Regresar
          </button>
        </Link>
        <Link to="/ListadoVentas">
          <button className="btn btn-info" type="button">
            Ver Ventas
          </button>
        </Link>
      </div>
      {/* <div className="card">
        <h3>Gestión de Mesas</h3>
       
       </div>
      */}




    </div>
  );
};

export default Admin;
