'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      proceso: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      anioFabricacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fechaIngreso: {
        type: Sequelize.DATE,
        allowNull: false
      },
      capacidadYd3: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      capacidadM3: {
        type: Sequelize.FLOAT,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('equipos');
  }
};
