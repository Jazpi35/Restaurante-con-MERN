import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const goTo = useNavigate();

  const validateUser = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente.

    if (correo !== '') {
      
      try {
        const response = await fetch(
          'https://restaurante-con-mern.vercel.app/api/auth/login',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              correo:correo,
              password:password
            })
          }
        );
        
        const data = await response.json();
        console.log("data json:", data);
        if (data.rol === "ADMIN_ROLE") {
          // El usuario tiene el rol de administrador
          goTo("/Admin");
        } else if (data.rol === "Mesero") {
          // El usuario tiene el rol de mesero
          goTo("/CrearVenta");
        } else if (data.rol === "COC_ROLE") {
          // El usuario tiene el rol de mesero
          goTo("/ListadoCocina");
        } else {
          setMensajeRespuesta("❌ Usuario incorrecto");
        }
        
      } catch (error) {
        setMensajeRespuesta("⚠️ Algo ocurrió al validar el usuario");
        console.error("❌ Error al validar usuario Login:", error);
      }
    } else {
      setMensajeRespuesta("❌ Debe diligenciar el campo usuario");
      console.log("❌ Debe diligenciar el campo usuario");
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <br></br>
      <form onSubmit={validateUser}>
        <input
          className="form-control"
          id="input"
          type="text"
          placeholder="Usuario"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <br />
        <input
          className="form-control"
          id="input"
          type="password"
          placeholder="contraseña "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />        
        <br />
      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
      <br />
        <button className="btn btn-primary" id="iniciar" type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};
/*Todo esta funcional*/
export default App;