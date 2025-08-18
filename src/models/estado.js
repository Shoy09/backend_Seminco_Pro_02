module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define("Estado", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado_principal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tipo_estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proceso: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: "estados",
    timestamps: false
  });

  // Nuevo modelo SubEstado
  const SubEstado = sequelize.define("SubEstado", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tipo_estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "estados",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }, {
    tableName: "sub_estados",
    timestamps: false
  });

  // Relación 1:N
  Estado.hasMany(SubEstado, { foreignKey: "estadoId", as: "subEstados" });
  SubEstado.belongsTo(Estado, { foreignKey: "estadoId", as: "estado" });

  return { Estado, SubEstado };
};
