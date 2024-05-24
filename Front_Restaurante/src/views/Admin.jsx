import "../styles/admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"; // Importa la librería UUID

const Admin = () => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [productoN, setProductoN] = useState("");
  const [precio, setPrecio] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");



  // función Crear usuario
  const crearUsuario = async (e) => {
    e.preventDefault();

    if (correo !== "" && (rol !== "" || rol > 0)) {

      try {
        const response = await fetch(
          "https://restaurante-con-mern.vercel.app/api/usuarios",
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
          Swal.fire({
            title: "Usuario creado exitosamente!",
            text: "Puede iniciar sesion!",
            icon: "success"
          });
          // Limpia los campos del formulario
          setCorreo("");
          setNombre("");
          setPassword("");
          setRol("");
        } else {
          Swal.fire({
            title: "Error al registrar el usuario!",
            text: "Si el error persiste comunicarse con el administrador!",
            icon: "error"
          });
        }
      } catch (error) {
        console.error("❌ Error al enviar el formulario:", error);
        Swal.fire({
          title: "Error al registrar el usuario! 2",
          text: "Si el error persiste comunicarse con el administrador!",
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "Error al registrar el usuario!",
        text: "Por favor diligencie todos los campos !",
        icon: "error"
      });
    }
  };

  // función Crear productoN
  const crearProducto = async (e) => {
    e.preventDefault();
    //console.log(productoN,precio);
    if (productoN !== "" && precio !== "") {
      try {
        console.log(productoN,precio);
        const response = await fetch(
          "https://restaurante-con-mern.vercel.app/api/productos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productoN,
              precio,
              estado: true
            }),
          }
        );
        console.log(response.body);
        if (response.ok) {
          Swal.fire({
            title: "Producto creado exitosamente!",
            text: "Puede seleccionar este!",
            icon: "success"
          });
          // Limpia los campos del formulario
          setProductoN("");
          setPrecio("");
        } else {
          Swal.fire({
            title: "Error al registrar el producto! 2",
            text: "Si el error persiste comunicarse con el administrador!",
            icon: "error"
          });
        }
      } catch (error) {
        console.error("❌ Error al enviar el formulario:", error);
        Swal.fire({
          title: "Error al registrar el producto! 2",
          text: "Si el error persiste comunicarse con el administrador!",
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "Error al registrar el producto!",
        text: "Por favor diligencie todos los campos !!",
        icon: "error"
      });
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
          value={productoN}
          type="text"
          name=""
          id=""
          placeholder="ingresa el Producto..."
          onChange={(e) => setProductoN(e.target.value)}
        />
        <input
          className="form-control"
          value={precio}
          type="number"
          name=""
          id=""
          placeholder="ingresa el precio..."
          onChange={(e) => setPrecio(e.target.value)}
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
