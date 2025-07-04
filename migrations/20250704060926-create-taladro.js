'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taladros', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      formatoPlanMineralId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'formato_plan_mineral',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      slotId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'slots',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nTaladro: { type: Sequelize.INTEGER, allowNull: false },
      estado: { type: Sequelize.STRING, allowNull: false, defaultValue: 'PROGRAMADO' },
      longitud_perforacion: { type: Sequelize.FLOAT, allowNull: false },
      nBarras: { type: Sequelize.INTEGER, allowNull: false },
      angulo: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taladros');
  }
};
