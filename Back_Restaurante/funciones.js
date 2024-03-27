const fs = require("fs/promises");
const path = require("path");

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Valida login usuario
const validarLogin = async (req, res) => {
  const username = req.body.user;
  const password = req.body.password;
  const allUsers = await fs.readFile(path.join(__dirname, "./data/users.json"));
  const userArray = JSON.parse(allUsers).usuarios; // Accede a la propiedad "usuarios"
  const result = userArray.find(user => user.user === username && user.password == password); // Busca el usuario

  if (result) {
    res.json(result);
  } else {
    res.json({}); // Si no se encuentra el usuario, devuelve un JSON vacío
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const { body } = req;
    const { user, nombre, rol } = body;

    // Lee el archivo users.json para obtener la lista actual de usuarios
    const usersList = await fs.readFile(
      path.join(__dirname, "./data/users.json"),
      "utf-8"
    );
    const usersData = JSON.parse(usersList);

    // Crea un nuevo objeto para el usuario
    const nuevoUsuario = {
      user,
      nombre,
      rol,
    };

    // Agrega el nuevo usuario a la lista
    usersData.usuarios.push(nuevoUsuario);

    // Escribe la lista actualizada en el archivo users.json
    await fs.writeFile(
      path.join(__dirname, "./data/users.json"),
      JSON.stringify(usersData, null, 2),
      "utf-8"
    );

    res.json({
      message: "✅ Registro creado exitosamente",
    });
  } catch (error) {
    console.error("❌ Error al registrar el usuario:", error);
    res.status(500).json({
      message: "❌ Error al registrar el usuario",
    });
  }
};

// Consulta todos los usuarios
const getUsuarios = async (req, res) => {
  const users = await fs.readFile(path.join(__dirname, "./data/users.json"));
  const usersJSON = JSON.parse(users);
  res.json(usersJSON);
};

// Eliminar un usuario existente
const eliminarUsuario = async (req, res) => {
  try {
    const { user } = req.params;

    // Lee el archivo users.json para obtener la lista actual de usuarios
    const usuariosList = await fs.readFile(
      path.join(__dirname, "./data/users.json"),
      "utf-8"
    );
    const usersData = JSON.parse(usuariosList);

    // Busca el cliente por su user
    const usersIndex = usersData.usuarios.findIndex((userp) => userp.user === user);

    if (usersIndex === -1) {
      return res.status(404).json({
        message: "❌ Usuario no encontrado (back)",
      });
    }

    // Elimina el usuario de la lista
    const removedUser = usersData.usuarios.splice(usersIndex, 1);

    // Convierte los datos de nuevo a formato JSON
    const updatedData = JSON.stringify(usersData, null, 2);

    // Escribe los datos actualizados de vuelta al archivo users.json
    await fs.writeFile(
      path.join(__dirname, "./data/users.json"),
      updatedData,
      "utf-8"
    );

    return res.status(200).json({
      message: "✅ Usuario eliminado correctamente",
      deletedUser: removedUser[0],
    });
  } catch (error) {
    console.error("❌ Error al eliminar el cliente:", error);
    res.status(500).json({
      message: "❌ Error 500 al eliminar el cliente",
    });
  }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    const { body } = req;
    const { producto, valor } = body;

    // Lee el archivo productos.json para obtener la lista actual de productos
    const productosList = await fs.readFile(
      path.join(__dirname, "./data/productos.json"),
      "utf-8"
    );
    const productosData = JSON.parse(productosList);

    // Crea un nuevo objeto para el producto
    const nuevoProducto = {
      producto,
      valor,
    };

    // Agrega el nuevo producto a la lista
    productosData.productos.push(nuevoProducto);

    // Escribe la lista actualizada en el archivo productos.json
    await fs.writeFile(
      path.join(__dirname, "./data/productos.json"),
      JSON.stringify(productosData, null, 2),
      "utf-8"
    );

    res.json({
      message: "✅ Registro creado exitosamente",
    });
  } catch (error) {
    console.error("❌ Error al registrar el Producto:", error);
    res.status(500).json({
      message: "❌ Error al registrar el Producto",
    });
  }
};

// Consulta todos los productos
const getProductos = async (req, res) => {
  const productos = await fs.readFile(
    path.join(__dirname, "./data/productos.json")
  );
  const productosJSON = JSON.parse(productos);
  res.json(productosJSON);
};

// Eliminar producto existente
const eliminarProducto = async (req, res) => {
  try {
    const { producto } = req.params;

    console.log("Producto a eliminar:", producto);

    // Lee el archivo productos.json para obtener la lista actual de productos
    const productosList = await fs.readFile(
      path.join(__dirname, './data/productos.json'),
      'utf-8'
    );
    const productosData = JSON.parse(productosList);
    console.log("Productos actuales:", productosData.productos);

    // Busca el producto por su nombre
    const productoIndex = productosData.productos.findIndex(
      (product) => product.producto === producto
    );

    if (productoIndex === -1) {
      console.log("Producto no encontrado en la lista.");
      return res.status(404).json({
        message: '❌ Producto no encontrado (backend)',
      });
    }

    // Elimina el producto de la lista
    const removedProduct = productosData.productos.splice(productoIndex, 1);

    // Convierte los datos de nuevo a formato JSON
    const updatedData = JSON.stringify(productosData, null, 2);

    // Escribe los datos actualizados de vuelta al archivo productos.json
    await fs.writeFile(
      path.join(__dirname, './data/productos.json'),
      updatedData,
      'utf-8'
    );

    return res.status(200).json({
      message: '✅ Producto eliminado correctamente',
      deletedProduct: removedProduct[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: '❌ Error al eliminar el producto',
      error: error.message,
    });
  }
};

// Crear una venta
const crearVenta = async (req, res) => {
  try {
    const { body } = req;
    const { id, producto, cantidad } = body;

    console.log("Venta a crear: ", id, " ", producto, " ", cantidad)

    // Lee el archivo productos.json para obtener la lista actual de ventas
    const ventasList = await fs.readFile(
      path.join(__dirname, "./data/ventas.json"),
      "utf-8"
    );
    const ventasData = JSON.parse(ventasList);

    // Crea un nuevo objeto para el producto
    const nuevaVenta = {
      id,
      producto,
      cantidad,
    };

    // Agrega el nuevo producto a la lista
    ventasData.ventas.push(nuevaVenta);

    // Escribe la lista actualizada en el archivo productos.json
    await fs.writeFile(
      path.join(__dirname, "./data/ventas.json"),
      JSON.stringify(ventasData, null, 2),
      "utf-8"
    );

    res.json({
      message: "✅ Registro creado exitosamente",
    });
  } catch (error) {
    console.error("❌ Error al registrar la Venta (backend):", error);
    res.status(500).json({
      message: "❌ Error al registrar la Venta (backend)",
    });
  }
};

// Consultar todas las ventas
const getVentas = async (req, res) => {
  // const ventas = await fs.readFile(path.join(__dirname, "./data/ventas.json"));
  // const ventasJSON = JSON.parse(ventas);
  // res.json(ventasJSON);

  try {
    // Leer los datos de ventas y productos
    const ventasData = await fs.readFile(path.join(__dirname, "./data/ventas.json"), "utf-8");
    const productosData = await fs.readFile(path.join(__dirname, "./data/productos.json"), "utf-8");

    // Parsear los datos JSON
    const ventasJSON = JSON.parse(ventasData);
    const productosJSON = JSON.parse(productosData);

    // Realizar la unión de datos
    const ventasConValores = ventasJSON.ventas.map((venta) => {
      const productoInfo = productosJSON.productos.find((producto) => producto.producto === venta.producto);

      if (productoInfo) {
        const vTotalVenta = parseInt(venta.cantidad, 10) * parseInt(productoInfo.valor, 10);
        return {
          ...venta,
          valorUnitario: productoInfo.valor,
          vTotalVenta,
        };
      } else {
        return venta;
      }
    });

    // Devolver los datos con la unión
    res.json({ ventas: ventasConValores });
  } catch (error) {
    console.error("❌ Error al consultar las ventas:", error);
    res.status(500).json({
      message: "❌ Error al consultar las ventas",
    });
  }


};

module.exports = {
  validarLogin,
  crearUsuario,
  getUsuarios,
  eliminarUsuario,
  crearProducto,
  getProductos,
  eliminarProducto,
  crearVenta,
  getVentas,
};
