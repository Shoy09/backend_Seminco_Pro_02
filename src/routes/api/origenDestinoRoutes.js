const express = require('express');
const router = express.Router();
const origenDestinoController = require('../../controllers/origenDestinoController');
const verificarToken = require('../../middleware/auth');

// Rutas CRUD
router.post('/', verificarToken, origenDestinoController.createOrigenDestino);
router.get('/', verificarToken, origenDestinoController.getOrigenesDestinos);
router.get('/:id', verificarToken, origenDestinoController.getOrigenDestinoById);
router.put('/:id', verificarToken, origenDestinoController.updateOrigenDestino);
router.delete('/:id', verificarToken, origenDestinoController.deleteOrigenDestino);

module.exports = router;
