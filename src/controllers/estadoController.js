const db = require('../config/db'); // Asegúrate de que `db.js` esté configurado correctamente

// Obtener todos los estados
exports.getAllEstados = async (req, res) => {
  try {
    const [estados] = await db.query('SELECT * FROM estados');
    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEstadosWithSub = async (req, res) => {
  try {
    // Traer todos los estados
    const [estados] = await db.query('SELECT * FROM estados');

    // Para cada estado, traer sus subestados
    for (let estado of estados) {
      const [subestados] = await db.query(
        'SELECT * FROM sub_estados WHERE estadoId = ?',
        [estado.id]
      );
      estado.subEstados = subestados; // Agregamos al objeto
    }

    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estado por ID
exports.getEstadoById = async (req, res) => {
  try {
    const [estado] = await db.query('SELECT * FROM estados WHERE id = ?', [req.params.id]);
    if (estado.length === 0) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }
    res.json(estado[0]); // Retornamos el primer resultado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo estado
exports.createEstado = async (req, res) => {
  try {
    const { 
      estado_principal, 
      codigo, 
      tipo_estado, 
      categoria, 
      proceso // Nuevo campo agregado
    } = req.body;

    const [result] = await db.query(
      'INSERT INTO estados (estado_principal, codigo, tipo_estado, categoria, proceso) VALUES (?, ?, ?, ?, ?)',
      [estado_principal, codigo, tipo_estado, categoria, proceso]
    );

    res.status(201).json({
      id: result.insertId,
      estado_principal,
      codigo,
      tipo_estado,
      categoria,
      proceso
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un estado por ID
exports.updateEstado = async (req, res) => {
  try {
    const { estado_principal, codigo, tipo_estado, categoria, proceso } = req.body; // Agregar el campo proceso
    const { id } = req.params;

    // Verificar si el estado existe
    const [estado] = await db.query('SELECT * FROM estados WHERE id = ?', [id]);
    if (estado.length === 0) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    // Actualizar el estado con los campos correctos
    await db.query(
      'UPDATE estados SET estado_principal = ?, codigo = ?, tipo_estado = ?, categoria = ?, proceso = ? WHERE id = ?',
      [estado_principal, codigo, tipo_estado, categoria, proceso, id]
    );

    res.json({ id, estado_principal, codigo, tipo_estado, categoria, proceso });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un estado por ID
exports.deleteEstado = async (req, res) => {
  try {
    const { id } = req.params;

    const [estado] = await db.query('SELECT * FROM estados WHERE id = ?', [id]);
    if (estado.length === 0) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    await db.query('DELETE FROM estados WHERE id = ?', [id]);
    res.json({ message: 'Estado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================= SUBESTADOS =======================

// Obtener todos los subestados de un estado principal
exports.getSubEstadosByEstadoId = async (req, res) => {
  try {
    const { id } = req.params; // ID del estado principal
    const [estado] = await db.query('SELECT * FROM estados WHERE id = ?', [id]);

    if (estado.length === 0) {
      return res.status(404).json({ error: 'Estado principal no encontrado' });
    }

    const [subestados] = await db.query('SELECT * FROM sub_estados WHERE estadoId = ?', [id]);
    res.json(subestados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un subestado asociado a un estado principal
exports.createSubEstado = async (req, res) => {
  try {
    const { id } = req.params; // ID del estado principal
    const { codigo, tipo_estado } = req.body;

    // Verificar que el estado principal existe
    const [estado] = await db.query('SELECT * FROM estados WHERE id = ?', [id]);
    if (estado.length === 0) {
      return res.status(404).json({ error: 'Estado principal no encontrado' });
    }

    const [result] = await db.query(
      'INSERT INTO sub_estados (codigo, tipo_estado, estadoId) VALUES (?, ?, ?)',
      [codigo, tipo_estado, id]
    );

    res.status(201).json({
      id: result.insertId,
      codigo,
      tipo_estado,
      estadoId: id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un subestado por ID
exports.updateSubEstado = async (req, res) => {
  try {
    const { id } = req.params; // ID del subestado
    const { codigo, tipo_estado } = req.body;

    // Verificar que existe el subestado
    const [subestado] = await db.query('SELECT * FROM sub_estados WHERE id = ?', [id]);
    if (subestado.length === 0) {
      return res.status(404).json({ error: 'SubEstado no encontrado' });
    }

    await db.query(
      'UPDATE sub_estados SET codigo = ?, tipo_estado = ? WHERE id = ?',
      [codigo, tipo_estado, id]
    );

    res.json({ id, codigo, tipo_estado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un subestado por ID
exports.deleteSubEstado = async (req, res) => {
  try {
    const { id } = req.params; // ID del subestado

    const [subestado] = await db.query('SELECT * FROM sub_estados WHERE id = ?', [id]);
    if (subestado.length === 0) {
      return res.status(404).json({ error: 'SubEstado no encontrado' });
    }

    await db.query('DELETE FROM sub_estados WHERE id = ?', [id]);
    res.json({ message: 'SubEstado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};