// migrations/YYYYMMDDHHMMSS-add-detalles-material-columns.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Agregar columna detalles_trabajo_realizado a InterSostenimiento
      await queryInterface.addColumn(
        'nube_inter_sostenimiento',
        'detalles_trabajo_realizado',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      // Agregar columna material a InterSostenimiento
      await queryInterface.addColumn(
        'nube_inter_sostenimiento',
        'material',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      // Agregar columna material a InterPerforacionHorizontal
      await queryInterface.addColumn(
        'nube_inter_perforacion_horizontal',
        'material',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      // Agregar columna material a InterPerforacionTaladroLargo
      await queryInterface.addColumn(
        'nube_inter_perforacion_taladro_largo',
        'material',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Revertir los cambios (para rollback)
      await queryInterface.removeColumn('nube_inter_sostenimiento', 'detalles_trabajo_realizado', { transaction });
      await queryInterface.removeColumn('nube_inter_sostenimiento', 'material', { transaction });
      await queryInterface.removeColumn('nube_inter_perforacion_horizontal', 'material', { transaction });
      await queryInterface.removeColumn('nube_inter_perforacion_taladro_largo', 'material', { transaction });
    });
  }
};