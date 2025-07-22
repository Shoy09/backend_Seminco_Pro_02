const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// 🔹 Modelo Operacion
const NubeOperacion = sequelize.define('nube_Operacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  turno: { type: DataTypes.STRING, allowNull: false },
  equipo: { type: DataTypes.STRING, allowNull: false },
  codigo: { type: DataTypes.STRING, allowNull: false },
  empresa: { type: DataTypes.STRING, allowNull: false },
  fecha: { type: DataTypes.STRING, allowNull: false },
  tipo_operacion: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, defaultValue: 'activo' },
  envio: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'nube_operacion',
  timestamps: true,
});

// 🔹 Modelo CheckListOperacion
const NubeCheckListOperacion = sequelize.define('nube_CheckListOperacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  operacion_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeOperacion, key: 'id' },
    onDelete: 'CASCADE',
  },
  descripcion: { type: DataTypes.STRING, allowNull: false },
  decision: { type: DataTypes.INTEGER, allowNull: false },
  observacion: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'nube_checklist_operacion',
  timestamps: true,
});

// 🔹 Modelo Horometros
const NubeHorometros = sequelize.define('nube_Horometros', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  operacion_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeOperacion, key: 'id' },
    onDelete: 'CASCADE',
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  inicial: { type: DataTypes.FLOAT, allowNull: false },
  final: { type: DataTypes.FLOAT, allowNull: false },
  EstaOP: { type: DataTypes.INTEGER, defaultValue: 0 },
  EstaINOP: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'nube_horometros',
  timestamps: true,
});

// 🔹 Modelo Estado
const NubeEstado = sequelize.define('nube_Estado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  operacion_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeOperacion, key: 'id' },
    onDelete: 'CASCADE',
  },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
  codigo: { type: DataTypes.STRING, allowNull: false },
  hora_inicio: { type: DataTypes.STRING, allowNull: false },
  hora_final: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'nube_estado',
  timestamps: true,
});

// 🔹 Modelo PerforacionTaladroLargo
const NubePerforacionTaladroLargo = sequelize.define('nube_PerforacionTaladroLargo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  zona: { type: DataTypes.STRING, allowNull: false },
  tipo_labor: { type: DataTypes.STRING, allowNull: false },
  labor: { type: DataTypes.STRING, allowNull: false },
  veta: { type: DataTypes.STRING, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false },
  tipo_perforacion: { type: DataTypes.STRING, allowNull: false },
  estado_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeEstado, key: 'id' },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'nube_perforacion_taladro_largo',
  timestamps: true,
});

// 🔹 Modelo InterPerforacionTaladroLargo
const NubeInterPerforacionTaladroLargo = sequelize.define('nube_InterPerforacionTaladroLargo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo_actividad: { type: DataTypes.STRING, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false },
  tajo: { type: DataTypes.STRING, allowNull: false },
  nbroca: { type: DataTypes.INTEGER, allowNull: false },
  ntaladro: { type: DataTypes.INTEGER, allowNull: false },
  nbarras: { type: DataTypes.INTEGER, allowNull: false },
  longitud_perforacion: { type: DataTypes.FLOAT, allowNull: false },
  angulo_perforacion: { type: DataTypes.FLOAT, allowNull: false },
  nfilas_de_hasta: { type: DataTypes.STRING, allowNull: false },
  detalles_trabajo_realizado: { type: DataTypes.STRING, allowNull: false },
  perforaciontaladrolargo_id: {
    type: DataTypes.INTEGER,
    references: { model: NubePerforacionTaladroLargo, key: 'id' },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'nube_inter_perforacion_taladro_largo',
  timestamps: true,
});

// 🔹 Modelo PerforacionHorizontal
const NubePerforacionHorizontal = sequelize.define('nube_PerforacionHorizontal', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  zona: { type: DataTypes.STRING, allowNull: false },
  tipo_labor: { type: DataTypes.STRING, allowNull: false },
  labor: { type: DataTypes.STRING, allowNull: false },
  veta: { type: DataTypes.STRING, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false },
  tipo_perforacion: { type: DataTypes.STRING, allowNull: false },
  estado_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeEstado, key: 'id' },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'nube_perforacion_horizontal',
  timestamps: true,
});

// 🔹 Modelo InterPerforacionHorizontal
const NubeInterPerforacionHorizontal = sequelize.define('nube_InterPerforacionHorizontal', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo_actividad: { type: DataTypes.STRING, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false },
  labor: { type: DataTypes.STRING, allowNull: false },
  seccion_la_labor: { type: DataTypes.STRING, allowNull: false },
  nbroca: { type: DataTypes.INTEGER, allowNull: false },
  ntaladro: { type: DataTypes.INTEGER, allowNull: false },
  ntaladros_rimados: { type: DataTypes.INTEGER, allowNull: false },
  longitud_perforacion: { type: DataTypes.FLOAT, allowNull: false },
  detalles_trabajo_realizado: { type: DataTypes.STRING, allowNull: false },
  perforacionhorizontal_id: {
    type: DataTypes.INTEGER,
    references: { model: NubePerforacionHorizontal, key: 'id' },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'nube_inter_perforacion_horizontal',
  timestamps: true,
});

// 🔹 Modelo Sostenimiento
const NubeSostenimiento = sequelize.define('nube_Sostenimiento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  zona: { type: DataTypes.STRING, allowNull: false },
  tipo_labor: { type: DataTypes.STRING, allowNull: false },
  labor: { type: DataTypes.STRING, allowNull: false },
  veta: { type: DataTypes.STRING, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false },
  tipo_perforacion: { type: DataTypes.STRING, allowNull: false },
  estado_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeEstado, key: 'id' },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'nube_sostenimiento',
  timestamps: true,
});

// 🔹 Modelo InterSostenimiento
const NubeInterSostenimiento = sequelize.define('nube_InterSostenimiento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo_actividad: { type: DataTypes.STRING, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false },
  labor: { type: DataTypes.STRING, allowNull: false },
  seccion_de_labor: { type: DataTypes.STRING, allowNull: false },
  nbroca: { type: DataTypes.INTEGER, allowNull: false },
  ntaladro: { type: DataTypes.INTEGER, allowNull: false },
  longitud_perforacion: { type: DataTypes.FLOAT, allowNull: false },
  malla_instalada: { type: DataTypes.STRING, allowNull: false },
  sostenimiento_id: {
    type: DataTypes.INTEGER,
    references: { model: NubeSostenimiento, key: 'id' },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'nube_inter_sostenimiento',
  timestamps: true,
});

// 🔹 Relaciones

NubeOperacion.hasMany(NubeHorometros, { foreignKey: 'operacion_id', as: 'horometros' });
NubeOperacion.hasMany(NubeCheckListOperacion, { foreignKey: 'operacion_id', as: 'checklists' });
NubeOperacion.hasMany(NubeEstado, { foreignKey: 'operacion_id', as: 'estados' });

NubeEstado.hasMany(NubePerforacionTaladroLargo, { foreignKey: 'estado_id', as: 'perforaciones_taladro_largo' });
NubeEstado.hasMany(NubePerforacionHorizontal, { foreignKey: 'estado_id', as: 'perforaciones_horizontal' });
NubeEstado.hasMany(NubeSostenimiento, { foreignKey: 'estado_id', as: 'sostenimientos' });

NubePerforacionTaladroLargo.hasMany(NubeInterPerforacionTaladroLargo, { foreignKey: 'perforaciontaladrolargo_id', as: 'inter_perforaciones' });
NubePerforacionHorizontal.hasMany(NubeInterPerforacionHorizontal, { foreignKey: 'perforacionhorizontal_id', as: 'inter_perforaciones_horizontal' });
NubeSostenimiento.hasMany(NubeInterSostenimiento, { foreignKey: 'sostenimiento_id', as: 'inter_sostenimientos' });

module.exports = {
  NubeOperacion,
  NubeHorometros,
  NubeCheckListOperacion,
  NubeEstado,
  NubePerforacionTaladroLargo,
  NubeInterPerforacionTaladroLargo,
  NubePerforacionHorizontal,
  NubeInterPerforacionHorizontal,
  NubeSostenimiento,
  NubeInterSostenimiento
};
