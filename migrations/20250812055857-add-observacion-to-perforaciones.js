module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('nube_perforacion_taladro_largo', 'observacion', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('nube_perforacion_horizontal', 'observacion', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('nube_sostenimiento', 'observacion', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('nube_perforacion_taladro_largo', 'observacion');
    await queryInterface.removeColumn('nube_perforacion_horizontal', 'observacion');
    await queryInterface.removeColumn('nube_sostenimiento', 'observacion');
  }
};
