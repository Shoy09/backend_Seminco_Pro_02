'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipoperforacions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING, allowNull: false },
      proceso: { type: Sequelize.STRING, allowNull: true }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tipoperforacions');
  }
};
