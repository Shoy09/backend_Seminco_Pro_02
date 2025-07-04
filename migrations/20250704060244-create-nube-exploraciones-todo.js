'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. nube_datos_trabajo_exploraciones
    await queryInterface.createTable('nube_datos_trabajo_exploraciones', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fecha: { type: Sequelize.STRING, allowNull: false },
      turno: { type: Sequelize.STRING, allowNull: false },
      taladro: { type: Sequelize.STRING, allowNull: false },
      pies_por_taladro: { type: Sequelize.STRING, allowNull: false },
      zona: { type: Sequelize.STRING, allowNull: false },
      tipo_labor: { type: Sequelize.STRING, allowNull: false },
      labor: { type: Sequelize.STRING, allowNull: false },
      ala: { type: Sequelize.STRING },
      veta: { type: Sequelize.STRING, allowNull: false },
      nivel: { type: Sequelize.STRING, allowNull: false },
      tipo_perforacion: { type: Sequelize.STRING, allowNull: false },
      estado: { type: Sequelize.STRING, defaultValue: 'Creado' },
      cerrado: { type: Sequelize.INTEGER, defaultValue: 0 },
      envio: { type: Sequelize.INTEGER, defaultValue: 0 },
      semanaDefault: { type: Sequelize.STRING },
      semanaSelect: { type: Sequelize.STRING },
      empresa: { type: Sequelize.STRING },
      seccion: { type: Sequelize.STRING },
      medicion: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // 2. nube_despacho
    await queryInterface.createTable('nube_despacho', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      datos_trabajo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_datos_trabajo_exploraciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      mili_segundo: { type: Sequelize.FLOAT, allowNull: false },
      medio_segundo: { type: Sequelize.FLOAT, allowNull: false },
      observaciones: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // 3. nube_despacho_detalle
    await queryInterface.createTable('nube_despacho_detalle', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      despacho_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_despacho',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nombre_material: { type: Sequelize.STRING, allowNull: false },
      cantidad: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // 4. nube_detalle_despacho_explosivos
    await queryInterface.createTable('nube_detalle_despacho_explosivos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      id_despacho: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_despacho',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      numero: { type: Sequelize.INTEGER, allowNull: false },
      ms_cant1: { type: Sequelize.STRING, allowNull: false },
      lp_cant1: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // 5. nube_devoluciones
    await queryInterface.createTable('nube_devoluciones', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      datos_trabajo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_datos_trabajo_exploraciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      mili_segundo: { type: Sequelize.FLOAT, allowNull: false },
      medio_segundo: { type: Sequelize.FLOAT, allowNull: false },
      observaciones: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // 6. nube_devolucion_detalle
    await queryInterface.createTable('nube_devolucion_detalle', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      devolucion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_devoluciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nombre_material: { type: Sequelize.STRING, allowNull: false },
      cantidad: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // 7. nube_detalle_devoluciones_explosivos
    await queryInterface.createTable('nube_detalle_devoluciones_explosivos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      id_devolucion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nube_devoluciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      numero: { type: Sequelize.INTEGER, allowNull: false },
      ms_cant1: { type: Sequelize.STRING, allowNull: false },
      lp_cant1: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina en orden inverso para evitar conflictos de foreign keys
    await queryInterface.dropTable('nube_detalle_devoluciones_explosivos');
    await queryInterface.dropTable('nube_devolucion_detalle');
    await queryInterface.dropTable('nube_devoluciones');
    await queryInterface.dropTable('nube_detalle_despacho_explosivos');
    await queryInterface.dropTable('nube_despacho_detalle');
    await queryInterface.dropTable('nube_despacho');
    await queryInterface.dropTable('nube_datos_trabajo_exploraciones');
  }
};
