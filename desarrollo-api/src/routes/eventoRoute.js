const express = require('express');
const router = express.Router();

//Controlador
const eventoController = require('../controllers/eventoController');

//router.VERBO_RUTA('RUTA', controlador.acción);
router.get('/eventos', eventoController.index);
router.get('/eventos/:ID', eventoController.show);

router.post('/eventos', eventoController.store);
router.put('/eventos/:ID', eventoController.update);

module.exports = router;