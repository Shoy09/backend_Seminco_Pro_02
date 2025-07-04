'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turnos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING, allowNull: false, unique: true }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('turnos');
  }
};
