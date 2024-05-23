const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');

//const { esRoleValido, emailExiste, productoExiste } = require('../helpers/db-validarots');

const { crearVenta, obtenerVentas, ventaTerminada } = require('../controllers/ventas');

const router = Router();

router.get('/', obtenerVentas);

router.post('/', crearVenta );

router.put('/:id', ventaTerminada);


module.exports = router;