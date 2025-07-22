module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear CheckListOperacion
    await queryInterface.createTable('nube_checklist_operacion', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      operacion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_operacion',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      decision: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      observacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 🔧 Cambiar campos operacion_id a estado_id en perforaciones y sostenimiento
    await queryInterface.removeColumn('nube_perforacion_taladro_largo', 'operacion_id');
    await queryInterface.addColumn('nube_perforacion_taladro_largo', 'estado_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'nube_estado',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('nube_perforacion_horizontal', 'operacion_id');
    await queryInterface.addColumn('nube_perforacion_horizontal', 'estado_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'nube_estado',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('nube_sostenimiento', 'operacion_id');
    await queryInterface.addColumn('nube_sostenimiento', 'estado_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'nube_estado',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir cambios
    await queryInterface.dropTable('nube_checklist_operacion');

    await queryInterface.removeColumn('nube_perforacion_taladro_largo', 'estado_id');
    await queryInterface.addColumn('nube_perforacion_taladro_largo', 'operacion_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'nube_operacion',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('nube_perforacion_horizontal', 'estado_id');
    await queryInterface.addColumn('nube_perforacion_horizontal', 'operacion_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'nube_operacion',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('nube_sostenimiento', 'estado_id');
    await queryInterface.addColumn('nube_sostenimiento', 'operacion_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'nube_operacion',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  }
};
