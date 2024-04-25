const { Router } = require('express');

const { crearPedidos, eliminarPedidos, obtenerPedidos } = require('../controllers/pedidos');

const router = Router();


router.get('/', obtenerPedidos);

//router.post('/', crearPedidos );

//router.delete('/:id', eliminarPedidos);

module.exports = router;