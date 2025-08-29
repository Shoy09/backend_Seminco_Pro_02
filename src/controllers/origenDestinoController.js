const OrigenDestino = require('../models/OrigenDestino');

// ✅ Crear un registro (POST)
exports.createOrigenDestino = async (req, res) => {
    try {
        const { operacion, tipo, nombre } = req.body;

        const nuevo = await OrigenDestino.create({ operacion, tipo, nombre });
        return res.status(201).json(nuevo);
    } catch (error) {
        console.error("Error al crear origen_destino:", error);
        return res.status(500).json({ error: 'Error al crear el registro' });
    }
};

// ✅ Obtener todos los registros (GET)
exports.getOrigenesDestinos = async (req, res) => {
    try {
        const registros = await OrigenDestino.findAll();
        return res.json(registros);
    } catch (error) {
        console.error("Error al obtener registros:", error);
        return res.status(500).json({ error: 'Error al obtener los registros' });
    }
};

// ✅ Obtener un registro por ID (GET /:id)
exports.getOrigenDestinoById = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await OrigenDestino.findByPk(id);

        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        return res.json(registro);
    } catch (error) {
        console.error("Error al obtener por ID:", error);
        return res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

// ✅ Actualizar un registro por ID (PUT /:id)
exports.updateOrigenDestino = async (req, res) => {
    try {
        const { id } = req.params;
        const { operacion, tipo, nombre } = req.body;

        const registro = await OrigenDestino.findByPk(id);
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        registro.operacion = operacion;
        registro.tipo = tipo;
        registro.nombre = nombre;

        await registro.save();

        return res.json(registro);
    } catch (error) {
        console.error("Error al actualizar:", error);
        return res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};
// ✅ Eliminar un registro por ID (DELETE /:id)
exports.deleteOrigenDestino = async (req, res) => {
    try {
        const { id } = req.params;

        const registro = await OrigenDestino.findByPk(id);
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        await registro.destroy();
        return res.json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};
