const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { esRoleValido, emailExiste } = require('../helpers/db-validarots');

const { usuariosGet,
    usuariosPost,
    usuariosDelete,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

//La segunda posicion es para el midelware 
//Como se van a validar varios campos se pone en forma de []
//Entonces valido que el correo sea un email y no algo diferente
//Por que le estoy esoecificando que el campo del body correo necesito validar
router.post('/', [
    check('correo').custom(emailExiste).isEmail(),
    //check('correo', 'El correo electrónico es obligatorio').notEmpty().isEmail().custom(emailExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 8 letras').isLength({ min: 8 }),
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE','COC_ROLE']),
    // este revisa los errores de cada uno de los checks
    // si pasa ejecuta el controlador si no pailas
    validarCampos
], usuariosPost);

/*
router.put('/:id', [
    //Valido con las funciones de Evalidator si el id existe
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

*/

router.delete('/:id', usuariosDelete);


module.exports = router;