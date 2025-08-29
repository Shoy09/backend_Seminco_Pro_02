'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nube_carguio', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      estado_id: {
        type: Sequelize.INTEGER,
        references: { model: 'nube_estado', key: 'id' },
        onDelete: 'CASCADE',
      },
      tipo_labor: { type: Sequelize.STRING },
      labor: { type: Sequelize.STRING },
      tipo_labor_manual: { type: Sequelize.STRING },
      labor_manual: { type: Sequelize.STRING },
      ncucharas: { type: Sequelize.INTEGER },
      observacion: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nube_carguio');
  }
};
