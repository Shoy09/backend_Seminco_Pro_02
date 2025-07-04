'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fechas_plan_mensual', {
      mes: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fechas_plan_mensual');
  }
};
