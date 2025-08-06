'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tabla nube_operacion
    await queryInterface.changeColumn('nube_operacion', 'turno', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_operacion', 'equipo', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_operacion', 'codigo', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_operacion', 'empresa', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_operacion', 'fecha', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_operacion', 'tipo_operacion', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_checklist_operacion
    await queryInterface.changeColumn('nube_checklist_operacion', 'descripcion', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_checklist_operacion', 'decision', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_checklist_operacion', 'observacion', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_checklist_operacion', 'categoria', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_horometros
    await queryInterface.changeColumn('nube_horometros', 'nombre', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_horometros', 'inicial', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_horometros', 'final', {
      type: Sequelize.FLOAT,
      allowNull: true
    });

    // Tabla nube_estado
    await queryInterface.changeColumn('nube_estado', 'numero', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_estado', 'estado', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_estado', 'codigo', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_estado', 'hora_inicio', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_estado', 'hora_final', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_perforacion_taladro_largo
    await queryInterface.changeColumn('nube_perforacion_taladro_largo', 'zona', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_taladro_largo', 'tipo_labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_taladro_largo', 'labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_taladro_largo', 'veta', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_taladro_largo', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_taladro_largo', 'tipo_perforacion', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_inter_perforacion_taladro_largo
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'codigo_actividad', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'tajo', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'nbroca', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'ntaladro', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'nbarras', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'longitud_perforacion', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'angulo_perforacion', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'nfilas_de_hasta', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_taladro_largo', 'detalles_trabajo_realizado', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_perforacion_horizontal
    await queryInterface.changeColumn('nube_perforacion_horizontal', 'zona', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_horizontal', 'tipo_labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_horizontal', 'labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_horizontal', 'veta', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_horizontal', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_perforacion_horizontal', 'tipo_perforacion', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_inter_perforacion_horizontal
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'codigo_actividad', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'seccion_la_labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'nbroca', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'ntaladro', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'ntaladros_rimados', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'longitud_perforacion', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_perforacion_horizontal', 'detalles_trabajo_realizado', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_sostenimiento
    await queryInterface.changeColumn('nube_sostenimiento', 'zona', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_sostenimiento', 'tipo_labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_sostenimiento', 'labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_sostenimiento', 'veta', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_sostenimiento', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_sostenimiento', 'tipo_perforacion', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Tabla nube_inter_sostenimiento
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'codigo_actividad', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'seccion_de_labor', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'nbroca', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'ntaladro', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'longitud_perforacion', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.changeColumn('nube_inter_sostenimiento', 'malla_instalada', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Aquí irían las operaciones inversas para revertir los cambios
    // Pero dado que son muchos campos, quizás prefieras no implementar el down
    // o implementarlo solo para los campos más críticos
  }
};