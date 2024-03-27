const express = require('express')
const router = express.Router()
const funciones = require('./funciones.js')

router
  
  //.post('/crearUsuario', funciones.crearUsuario)
  //.get('/getUsuarios', funciones.getUsuarios)
  //.delete('/eliminarUsuario/:user', funciones.eliminarUsuario)
  //.post('/crearProducto', funciones.crearProducto)
 // .get('/getProductos', funciones.getProductos)
  //.delete('/eliminarProducto/:producto', funciones.eliminarProducto)
  .post('/crearVenta', funciones.crearVenta)
  .get('/getVentas', funciones.getVentas)


module.exports = router