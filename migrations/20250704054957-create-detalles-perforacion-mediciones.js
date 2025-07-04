'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalles_perforacion_mediciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      perforacion_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cant_regis: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kg_explo: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      avance: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      ancho: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      alto: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detalles_perforacion_mediciones');
  }
};
