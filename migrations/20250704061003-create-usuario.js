'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      codigo_dni: { type: Sequelize.STRING, allowNull: false },
      apellidos: { type: Sequelize.STRING, allowNull: false },
      nombres: { type: Sequelize.STRING, allowNull: false },
      cargo: { type: Sequelize.STRING, allowNull: true },
      rol: { type: Sequelize.STRING, allowNull: true },
      empresa: { type: Sequelize.STRING, allowNull: true },
      guardia: { type: Sequelize.STRING, allowNull: true },
      autorizado_equipo: { type: Sequelize.STRING, allowNull: true },
      area: { type: Sequelize.STRING, allowNull: true },
      clasificacion: { type: Sequelize.STRING, allowNull: true },
      correo: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: true }
      },
      password: { type: Sequelize.STRING, allowNull: false },
      firma_imagen: { type: Sequelize.STRING, allowNull: true },
      operaciones_autorizadas: { type: Sequelize.JSON, allowNull: true, defaultValue: {} },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
