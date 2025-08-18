const express = require('express');
const router = express.Router();
const estadoController = require('../../controllers/estadoController');
const verificarToken = require('../../middleware/auth');

// Rutas protegidas con el middleware verificarToken
router.get('/', verificarToken, estadoController.getAllEstados);
router.get('/:id', verificarToken, estadoController.getEstadoById);
router.post('/', verificarToken, estadoController.createEstado);
router.put('/:id', verificarToken, estadoController.updateEstado);
router.delete('/:id', verificarToken, estadoController.deleteEstado);

// ================== RUTAS SUBESTADOS ==================
router.get('/:id/subestados', verificarToken, estadoController.getSubEstadosByEstadoId);
router.post('/:id/subestados', verificarToken, estadoController.createSubEstado);
router.put('/subestados/:id', verificarToken, estadoController.updateSubEstado);

// Eliminar un subestado por ID
router.delete('/subestados/:id', verificarToken, estadoController.deleteSubEstado);
// Obtener todos los estados con subestados incluidos
router.get('/con-subestados', verificarToken, estadoController.getAllEstadosWithSub);

module.exports = router;
