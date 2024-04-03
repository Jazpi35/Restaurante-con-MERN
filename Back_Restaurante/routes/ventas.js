const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');

//const { esRoleValido, emailExiste, productoExiste } = require('../helpers/db-validarots');

const { crearVenta, obtenerVentas } = require('../controllers/ventas');

const router = Router();

router.get('/', obtenerVentas);

//La segunda posicion es para el midelware 
//Como se van a validar varios campos se pone en forma de []
//Entonces valido que el correo sea un email y no algo diferente
//Por que le estoy esoecificando que el campo del body correo necesito validar

router.post('/', crearVenta );

//router.delete('/:id',);


module.exports = router;