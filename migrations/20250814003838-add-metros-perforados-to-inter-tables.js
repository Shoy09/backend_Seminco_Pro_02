'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar a nube_inter_sostenimiento
    await queryInterface.addColumn('nube_inter_sostenimiento', 'metros_perforados', {
      type: Sequelize.FLOAT,
      allowNull: true
    });

    // Agregar a nube_inter_perforacion_horizontal
    await queryInterface.addColumn('nube_inter_perforacion_horizontal', 'metros_perforados', {
      type: Sequelize.FLOAT,
      allowNull: true
    });

    // Agregar a nube_inter_perforacion_taladro_largo
    await queryInterface.addColumn('nube_inter_perforacion_taladro_largo', 'metros_perforados', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar de nube_inter_sostenimiento
    await queryInterface.removeColumn('nube_inter_sostenimiento', 'metros_perforados');

    // Eliminar de nube_inter_perforacion_horizontal
    await queryInterface.removeColumn('nube_inter_perforacion_horizontal', 'metros_perforados');

    // Eliminar de nube_inter_perforacion_taladro_largo
    await queryInterface.removeColumn('nube_inter_perforacion_taladro_largo', 'metros_perforados');
  }
};
