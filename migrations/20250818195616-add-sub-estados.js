"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sub_estados", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      estadoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "estados",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sub_estados");
  }
};
