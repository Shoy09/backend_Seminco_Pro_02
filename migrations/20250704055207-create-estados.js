'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estados', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      estado_principal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      tipo_estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      proceso: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estados');
  }
};
