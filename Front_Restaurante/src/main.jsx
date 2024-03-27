import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Admin from "./views/Admin.jsx";
import CrearVenta from "./views/CrearVenta.jsx"
import ListadoUsuarios from "./views/ListadoUsuarios.jsx";
import ListadoProductos from "./views/ListadoProductos.jsx";
import ListadoVentas from "./views/ListadoVentas.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/CrearVenta",
    element: <CrearVenta />,
  },
  {
    path: "/ListadoUsuarios",
    element: <ListadoUsuarios />,
  },
  {
    path: "/ListadoProductos",
    element: <ListadoProductos />,
  },
  {
    path: "/ListadoVentas",
    element: <ListadoVentas />,
  },
];

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
