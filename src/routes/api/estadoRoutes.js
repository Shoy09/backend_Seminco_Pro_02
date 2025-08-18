const express = require('express');
const router = express.Router();
const estadoController = require('../../controllers/estadoController');
const verificarToken = require('../../middleware/auth');

router.get('/', verificarToken, estadoController.getAllEstados);

// ================== RUTAS SUBESTADOS ==================
router.get('/con-subestados', verificarToken, estadoController.getAllEstadosWithSub);
router.get('/:id/subestados', verificarToken, estadoController.getSubEstadosByEstadoId);
router.post('/:id/subestados', verificarToken, estadoController.createSubEstado);
router.put('/subestados/:id', verificarToken, estadoController.updateSubEstado);
router.delete('/subestados/:id', verificarToken, estadoController.deleteSubEstado);

router.get('/:id', verificarToken, estadoController.getEstadoById);
router.post('/', verificarToken, estadoController.createEstado);
router.put('/:id', verificarToken, estadoController.updateEstado);
router.delete('/:id', verificarToken, estadoController.deleteEstado);

module.exports = router;
