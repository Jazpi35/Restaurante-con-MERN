const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { productoExiste } = require('../helpers/db-validarots');

const { crearProducto, eliminarProducto, obtenerProductos } = require('../controllers/productos');

const router = Router();

router.get('/', obtenerProductos);

//La segunda posicion es para el midelware 
//Como se van a validar varios campos se pone en forma de []
//Entonces valido que el correo sea un email y no algo diferente
//Por que le estoy esoecificando que el campo del body correo necesito validar

router.post('/', [
    check('producto').custom(productoExiste),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);

/*
router.put('/:id', [
    //Valido con las funciones de Evalidator si el id existe
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

*/

router.delete('/:id', eliminarProducto);


module.exports = router;