const { Router } = require('express');
//const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');

//const { esRoleValido, emailExiste, productoExiste } = require('../helpers/db-validarots');

const { obtenerMesas } = require('../controllers/mesas');

const router = Router();

router.get('/', obtenerMesas);

module.exports = router;