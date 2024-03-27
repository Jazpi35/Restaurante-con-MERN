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
          'http://localhost:3500/api/auth/login',{
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
        } else if (data.rol === "USER_ROLE") {
          // El usuario tiene el rol de mesero
          goTo("/CrearVenta");
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

export default App;



// import "./App.css";
// import { useState } from "react";
// //import { useNavigate } from "react-router-dom";

// const App = () => {
//   const [correo, setCorreo] = useState(null);
//   //const goTo = useNavigate();

//   function validateUser() {
//     if (correo !== null) {
//       try {
//         const response = fetch(
//           `http://localhost:3500/v1/restaurante/validarLogin/${correo}`
//         );
//         const data = response.json();
//         console.log("data json:" + data);
//         // if (data === "1"){
//         //   goTo("/Admin")
//         // } if (data === "2") {
//         //   goTo("/CrearVenta")
//         // } else {
//         //   console.log("Usuario no válido")
//         // }
//       } catch (error) {
//         console.error("Error al validar usuario Login:", error);
//       }
//     } else {
//       console.log("Debe diligenciar el campo usuario");
//     }
//     // if (correo === "juego" && password === "juego123") {
//     //   goTo("/Juego");
//     // } else if (correo === "cocina" && password === "cocina123") {
//     //   goTo("/Cocina");
//     // } else {
//     //   alert("¡Usuario Incorrecto! Inténtalo de nuevo");
//     // }
//   }

//   return (
//     // <div>
//     //   <input id="input" type="text" placeholder="Usuario" onChange={(e) => setCorreo(e.target.value)}/>
//     //   <button id="iniciar" onClick={validateUser}>Iniciar</button>
//     // </div>
//     <div className="App">
//       <h1>Login</h1>

//       <form onSubmit={validateUser}>
//         <input
//           id="input"
//           type="text"
//           placeholder="Usuario"
//           onChange={(e) => setCorreo(e.target.value)}
//         />
//         <br></br>
//         <br></br>
//         <button id="iniciar" type="submit">Iniciar</button>
//       </form>
//     </div>
//   );
// };

// export default App;
