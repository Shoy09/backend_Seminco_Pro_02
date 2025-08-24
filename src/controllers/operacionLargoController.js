const sequelize = require('../config/sequelize');
const { NubeOperacion,
  NubeHorometros,
  NubeCheckListOperacion,
  NubeEstado,
  NubePerforacionTaladroLargo,
  NubeInterPerforacionTaladroLargo,
  NubePerforacionHorizontal,
  NubeInterPerforacionHorizontal,
  NubeSostenimiento,
  NubeInterSostenimiento
    
 } = require('../models/operacionLargo');

async function crearOperacionLargo(req, res) {
  const t = await sequelize.transaction();

  try {
    const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
    const idsOperacionesCreadas = [];

    for (const data of operacionesData) {
      // 1️⃣ Crear operación principal
      const operacion = await NubeOperacion.create(data.operacion, { transaction: t });
      idsOperacionesCreadas.push(operacion.id);

      // 2️⃣ Crear estados y guardar IDs
      const estados = data.estados.map(estado => ({
        ...estado,
        operacion_id: operacion.id
      }));
      const estadosCreados = await NubeEstado.bulkCreate(estados, { transaction: t, returning: true });

      // 3️⃣ Crear perforaciones de cada estado
      const perforacionesCreadas = [];
      const interPerforacionesToCreate = [];

      for (let i = 0; i < data.estados.length; i++) {
        const estadoData = data.estados[i];
        const estadoCreado = estadosCreados[i];

        if (estadoData.perforaciones && estadoData.perforaciones.length > 0) {
          // Crear perforaciones con estado_id
          const perforaciones = estadoData.perforaciones.map(perf => ({
            ...perf,
            estado_id: estadoCreado.id
          }));
          const perforacionesCreated = await NubePerforacionTaladroLargo.bulkCreate(perforaciones, { transaction: t, returning: true });

          // Crear interperforaciones
          for (let j = 0; j < estadoData.perforaciones.length; j++) {
            const perforacionData = estadoData.perforaciones[j];
            const perforacionCreated = perforacionesCreated[j];

            if (perforacionData.inter_perforaciones && perforacionData.inter_perforaciones.length > 0) {
              const inters = perforacionData.inter_perforaciones.map(inter => ({
                ...inter,
                perforaciontaladrolargo_id: perforacionCreated.id
              }));
              interPerforacionesToCreate.push(...inters);
            }
          }
        }
      }

      // 4️⃣ Bulk create interperforaciones
      if (interPerforacionesToCreate.length > 0) {
        await NubeInterPerforacionTaladroLargo.bulkCreate(interPerforacionesToCreate, { transaction: t });
      }

      // 5️⃣ Crear horómetros
      if (data.horometros && data.horometros.length > 0) {
        const horometros = data.horometros.map(horo => ({
          ...horo,
          operacion_id: operacion.id
        }));
        await NubeHorometros.bulkCreate(horometros, { transaction: t });
      }

      // 6️⃣ Crear checklist
      if (data.checklists && data.checklists.length > 0) {
        const checklist = data.checklists.map(chk => ({
          ...chk,
          operacion_id: operacion.id
        }));
        await NubeCheckListOperacion.bulkCreate(checklist, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json({ operaciones_ids: idsOperacionesCreadas });

  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


async function actualizarOperacionLargo(req, res) {
  const t = await sequelize.transaction();

  try {
    const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
    const resultados = [];

    for (const data of operacionesData) {
      const operacionId = data.operacion.id;
      const resultadoOperacion = {
        id: operacionId,
        success: true,
        message: 'Operación actualizada correctamente'
      };

      try {
        const operacionExistente = await NubeOperacion.findByPk(operacionId, { transaction: t });
        if (!operacionExistente) throw new Error(`Operación ${operacionId} no encontrada`);

        // 1️⃣ Actualizar operación principal
        await NubeOperacion.update(data.operacion, {
          where: { id: operacionId },
          transaction: t
        });

        // 2️⃣ Estados
        await NubeEstado.destroy({ where: { operacion_id: operacionId }, transaction: t });
        const estadosCreados = await NubeEstado.bulkCreate(
          data.estados.map(e => ({ ...e, operacion_id: operacionId })),
          { transaction: t, returning: true }
        );

        // 3️⃣ Horómetros
        await NubeHorometros.destroy({ where: { operacion_id: operacionId }, transaction: t });
        if (data.horometros && data.horometros.length > 0) {
          await NubeHorometros.bulkCreate(
            data.horometros.map(h => ({ ...h, operacion_id: operacionId })),
            { transaction: t }
          );
        }

        // 4️⃣ Perforaciones e interperforaciones

        // Eliminar perforaciones e interperforaciones antiguas
        const perforacionesAnt = await NubePerforacionTaladroLargo.findAll({
          where: { estado_id: estadosCreados.map(e => e.id) },
          transaction: t
        });

        if (perforacionesAnt.length > 0) {
          await NubeInterPerforacionTaladroLargo.destroy({
            where: {
              perforaciontaladrolargo_id: perforacionesAnt.map(p => p.id)
            },
            transaction: t
          });
        }

        await NubePerforacionTaladroLargo.destroy({
          where: { estado_id: estadosCreados.map(e => e.id) },
          transaction: t
        });

        // Crear nuevas perforaciones e interperforaciones
        const interPerforacionesToCreate = [];

        for (let i = 0; i < data.estados.length; i++) {
          const estadoData = data.estados[i];
          const estadoCreado = estadosCreados[i];

          if (estadoData.perforaciones && estadoData.perforaciones.length > 0) {
            // Crear perforaciones con estado_id
            const perforaciones = estadoData.perforaciones.map(perf => ({
              ...perf,
              estado_id: estadoCreado.id
            }));
            const perforacionesCreated = await NubePerforacionTaladroLargo.bulkCreate(perforaciones, { transaction: t, returning: true });

            // Crear interperforaciones
            for (let j = 0; j < estadoData.perforaciones.length; j++) {
              const perforacionData = estadoData.perforaciones[j];
              const perforacionCreated = perforacionesCreated[j];

              if (perforacionData.inter_perforaciones && perforacionData.inter_perforaciones.length > 0) {
                const inters = perforacionData.inter_perforaciones.map(inter => ({
                  ...inter,
                  perforaciontaladrolargo_id: perforacionCreated.id
                }));
                interPerforacionesToCreate.push(...inters);
              }
            }
          }
        }

        // Bulk create interperforaciones
        if (interPerforacionesToCreate.length > 0) {
          await NubeInterPerforacionTaladroLargo.bulkCreate(interPerforacionesToCreate, { transaction: t });
        }

        // 5️⃣ Checklist
        await NubeCheckListOperacion.destroy({ where: { operacion_id: operacionId }, transaction: t });
        if (data.checklists && data.checklists.length > 0) {
          await NubeCheckListOperacion.bulkCreate(
            data.checklists.map(chk => ({ ...chk, operacion_id: operacionId })),
            { transaction: t }
          );
        }

        resultados.push(resultadoOperacion);

      } catch (err) {
        resultadoOperacion.success = false;
        resultadoOperacion.message = `Error: ${err.message}`;
        resultados.push(resultadoOperacion);
      }
    }

    const errores = resultados.filter(r => !r.success);
    if (errores.length) {
      await t.rollback();
      return res.status(207).json({
        message: 'Algunas operaciones fallaron',
        resultados
      });
    }

    await t.commit();
    res.status(200).json({ resultados });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
}


async function obtenerOperacionesLargo(req, res) {
  try {
    const operaciones = await NubeOperacion.findAll({
      where: { tipo_operacion: 'PERFORACIÓN TALADROS LARGOS' },
      include: [
        {
          model: NubeEstado,
          as: 'estados',
          include: [
            {
              model: NubePerforacionTaladroLargo,
              as: 'perforaciones_taladro_largo',
              include: [
                { model: NubeInterPerforacionTaladroLargo, as: 'inter_perforaciones' }
              ]
            }
          ]
        },
        { model: NubeHorometros, as: 'horometros' },
        { model: NubeCheckListOperacion, as: 'checklists' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(operaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//HORIZONTAL-----------------------------------------------------------
async function crearOperacionHorizontal(req, res) {
  const t = await sequelize.transaction();

  try {
    const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
    const idsOperacionesCreadas = [];

    for (const data of operacionesData) {
      // 1️⃣ Crear operación principal
      const operacion = await NubeOperacion.create(data.operacion, { transaction: t });
      idsOperacionesCreadas.push(operacion.id);

      // 2️⃣ Crear estados y guardar IDs
      const estados = data.estados.map(estado => ({
        ...estado,
        operacion_id: operacion.id
      }));
      const estadosCreados = await NubeEstado.bulkCreate(estados, { transaction: t, returning: true });

      // 3️⃣ Crear perforaciones horizontales de cada estado
      const interPerforacionesToCreate = [];

      for (let i = 0; i < data.estados.length; i++) {
        const estadoData = data.estados[i];
        const estadoCreado = estadosCreados[i];

        // Cambiado de "perforaciones" a "perforaciones_horizontales"
        if (estadoData.perforaciones_horizontales && estadoData.perforaciones_horizontales.length > 0) {
          // Crear perforaciones horizontales con estado_id
          const perforaciones = estadoData.perforaciones_horizontales.map(perf => ({
            ...perf,
            estado_id: estadoCreado.id
          }));
          const perforacionesCreated = await NubePerforacionHorizontal.bulkCreate(perforaciones, { 
            transaction: t, 
            returning: true 
          });

          // Preparar inter-perforaciones horizontales
          for (let j = 0; j < estadoData.perforaciones_horizontales.length; j++) {
            const perforacionData = estadoData.perforaciones_horizontales[j];
            const perforacionCreated = perforacionesCreated[j];

            if (perforacionData.inter_perforaciones && perforacionData.inter_perforaciones.length > 0) {
              const inters = perforacionData.inter_perforaciones.map(inter => ({
                ...inter,
                perforacionhorizontal_id: perforacionCreated.id
              }));
              interPerforacionesToCreate.push(...inters);
            }
          }
        }
      }

      // 4️⃣ Bulk create inter-perforaciones horizontales
      if (interPerforacionesToCreate.length > 0) {
        await NubeInterPerforacionHorizontal.bulkCreate(interPerforacionesToCreate, { transaction: t });
      }

      // 5️⃣ Crear horómetros
      if (data.horometros && data.horometros.length > 0) {
        const horometros = data.horometros.map(horo => ({
          ...horo,
          operacion_id: operacion.id
        }));
        await NubeHorometros.bulkCreate(horometros, { transaction: t });
      }

      // 6️⃣ Crear checklist
      if (data.checklists && data.checklists.length > 0) {
        const checklist = data.checklists.map(chk => ({
          ...chk,
          operacion_id: operacion.id
        }));
        await NubeCheckListOperacion.bulkCreate(checklist, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json({ 
      success: true,
      operaciones_ids: idsOperacionesCreadas,
      message: 'Operación horizontal creada exitosamente'
    });

  } catch (error) {
    await t.rollback();
    console.error('Error en crearOperacionHorizontal:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: 'Error al crear la operación horizontal'
    });
  }
}

// Versión mejorada del controlador
async function actualizarOperacionHorizontal(req, res) {
    const t = await sequelize.transaction();

    try {
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const resultados = [];

        for (const data of operacionesData) {
            if (!data.operacion || !data.operacion.id) {
                resultados.push({
                    success: false,
                    message: 'Falta el ID de la operación',
                    data: data
                });
                continue;
            }

            const operacionId = data.operacion.id;
            const resultadoOperacion = {
                id: operacionId,
                success: true,
                message: 'Operación horizontal actualizada correctamente',
                detalles: {}
            };

            try {
                // 1️⃣ Verificar que la operación existe
                const operacionExistente = await NubeOperacion.findByPk(operacionId, { transaction: t });
                if (!operacionExistente) {
                    throw new Error(`Operación horizontal con ID ${operacionId} no encontrada`);
                }

                // 2️⃣ Actualizar operación principal (solo campos proporcionados)
                const { id, ...datosOperacion } = data.operacion;
                await NubeOperacion.update(datosOperacion, {
                    where: { id: operacionId },
                    transaction: t
                });

                // 3️⃣ Manejo de estados y sus relaciones (solo si se proporcionan)
                if (data.estados) {
                    // Eliminar estados existentes y sus relaciones
                    const estadosExistentes = await NubeEstado.findAll({
                        where: { operacion_id: operacionId },
                        transaction: t
                    });
                    
                    if (estadosExistentes.length > 0) {
                        const estadoIds = estadosExistentes.map(e => e.id);
                        
                        // Eliminar relaciones de perforaciones
                        const perforacionesExistentes = await NubePerforacionHorizontal.findAll({
                            where: { estado_id: estadoIds },
                            transaction: t
                        });
                        
                        if (perforacionesExistentes.length > 0) {
                            const perforacionIds = perforacionesExistentes.map(p => p.id);
                            await NubeInterPerforacionHorizontal.destroy({
                                where: { perforacionhorizontal_id: perforacionIds },
                                transaction: t
                            });
                        }
                        
                        await NubePerforacionHorizontal.destroy({
                            where: { estado_id: estadoIds },
                            transaction: t
                        });
                    }
                    
                    await NubeEstado.destroy({ 
                        where: { operacion_id: operacionId }, 
                        transaction: t 
                    });

                    // Crear nuevos estados si se proporcionaron
                    if (data.estados.length > 0) {
                        const estadosCreados = await NubeEstado.bulkCreate(
                            data.estados.map(estado => ({ ...estado, operacion_id: operacionId })),
                            { transaction: t, returning: true }
                        );

                        // 4️⃣ Manejo de perforaciones e interperforaciones
                        const interPerforacionesToCreate = [];
                        
                        for (let i = 0; i < data.estados.length; i++) {
                            const estadoData = data.estados[i];
                            const estadoCreado = estadosCreados[i];

                            if (estadoData.perforaciones_horizontales && estadoData.perforaciones_horizontales.length > 0) {
                                // Crear perforaciones
                                const perforaciones = estadoData.perforaciones_horizontales.map(perf => ({
                                    ...perf,
                                    estado_id: estadoCreado.id
                                }));
                                
                                const perforacionesCreadas = await NubePerforacionHorizontal.bulkCreate(
                                    perforaciones,
                                    { transaction: t, returning: true }
                                );

                                // Preparar interperforaciones
                                for (let j = 0; j < estadoData.perforaciones_horizontales.length; j++) {
                                    const perforacionData = estadoData.perforaciones_horizontales[j];
                                    const perforacionCreada = perforacionesCreadas[j];

                                    if (perforacionData.inter_perforaciones && perforacionData.inter_perforaciones.length > 0) {
                                        const inters = perforacionData.inter_perforaciones.map(inter => ({
                                            ...inter,
                                            perforacionhorizontal_id: perforacionCreada.id
                                        }));
                                        interPerforacionesToCreate.push(...inters);
                                    }
                                }
                            }
                        }

                        // Crear interperforaciones en un solo bulk create
                        if (interPerforacionesToCreate.length > 0) {
                            await NubeInterPerforacionHorizontal.bulkCreate(
                                interPerforacionesToCreate,
                                { transaction: t }
                            );
                        }
                    }
                }

                // 5️⃣ Manejo de horómetros (solo si se proporcionan)
                if (data.horometros !== undefined) {
                    await NubeHorometros.destroy({ 
                        where: { operacion_id: operacionId }, 
                        transaction: t 
                    });
                    
                    if (data.horometros.length > 0) {
                        await NubeHorometros.bulkCreate(
                            data.horometros.map(horo => ({ ...horo, operacion_id: operacionId })),
                            { transaction: t }
                        );
                    }
                }

                // 6️⃣ Manejo de checklist (solo si se proporcionan)
                if (data.checklists !== undefined) {
                    await NubeCheckListOperacion.destroy({ 
                        where: { operacion_id: operacionId }, 
                        transaction: t 
                    });
                    
                    if (data.checklists.length > 0) {
                        await NubeCheckListOperacion.bulkCreate(
                            data.checklists.map(chk => ({ ...chk, operacion_id: operacionId })),
                            { transaction: t }
                        );
                    }
                }

                resultados.push(resultadoOperacion);
            } catch (error) {
                await t.rollback();
                resultadoOperacion.success = false;
                resultadoOperacion.message = `Error al actualizar operación ${operacionId}`;
                resultadoOperacion.error = error.message;
                resultados.push(resultadoOperacion);
            }
        }

        await t.commit();
        res.status(200).json({
            success: true,
            message: 'Proceso de actualización completado',
            resultados,
            total: resultados.length,
            exitosas: resultados.filter(r => r.success).length,
            fallidas: resultados.filter(r => !r.success).length
        });

    } catch (error) {
        await t.rollback();
        console.error('Error en actualizarOperacionHorizontal:', error);
        res.status(500).json({
            success: false,
            message: 'Error general en la transacción',
            error: error.message
        });
    }
}

async function obtenerOperacionesHorizontal(req, res) {
  try {
    const operaciones = await NubeOperacion.findAll({
      where: { tipo_operacion: 'PERFORACIÓN HORIZONTAL' },
      include: [
        {
          model: NubeEstado,
          as: 'estados',
          include: [
            {
              model: NubePerforacionHorizontal,
              as: 'perforaciones_horizontal',
              include: [
                { model: NubeInterPerforacionHorizontal, as: 'inter_perforaciones_horizontal' }
              ]
            }
          ]
        },
        { model: NubeHorometros, as: 'horometros' },
        { model: NubeCheckListOperacion, as: 'checklists' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(operaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//SOSTENIMIENTO---------------------------------------------------------
async function crearOperacionSostenimiento(req, res) {
  const t = await sequelize.transaction();

  try {
    const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
    const idsOperacionesCreadas = [];

    for (const data of operacionesData) {
      // 1️⃣ Crear operación principal
      const operacion = await NubeOperacion.create(data.operacion, { transaction: t });
      idsOperacionesCreadas.push(operacion.id);

      // 2️⃣ Crear estados y guardar IDs
      const estados = data.estados.map(estado => ({
        ...estado,
        operacion_id: operacion.id
      }));
      const estadosCreados = await NubeEstado.bulkCreate(estados, { transaction: t, returning: true });

      // 3️⃣ Crear sostenimientos de cada estado
      const interSostenimientosToCreate = [];

      for (let i = 0; i < data.estados.length; i++) {
        const estadoData = data.estados[i];
        const estadoCreado = estadosCreados[i];

        if (estadoData.sostenimientos && estadoData.sostenimientos.length > 0) {
          // Crear sostenimientos con estado_id
          const sostenimientos = estadoData.sostenimientos.map(sost => ({
            ...sost,
            estado_id: estadoCreado.id
          }));
          const sostenimientosCreated = await NubeSostenimiento.bulkCreate(sostenimientos, { 
            transaction: t, 
            returning: true 
          });

          // Preparar inter-sostenimientos
          for (let j = 0; j < estadoData.sostenimientos.length; j++) {
            const sostenimientoData = estadoData.sostenimientos[j];
            const sostenimientoCreated = sostenimientosCreated[j];

            if (sostenimientoData.inter_sostenimientos && sostenimientoData.inter_sostenimientos.length > 0) {
              const inters = sostenimientoData.inter_sostenimientos.map(inter => ({
                ...inter,
                sostenimiento_id: sostenimientoCreated.id
              }));
              interSostenimientosToCreate.push(...inters);
            }
          }
        }
      }

      // 4️⃣ Bulk create inter-sostenimientos
      if (interSostenimientosToCreate.length > 0) {
        await NubeInterSostenimiento.bulkCreate(interSostenimientosToCreate, { transaction: t });
      }

      // 5️⃣ Crear horómetros
      if (data.horometros && data.horometros.length > 0) {
        const horometros = data.horometros.map(horo => ({
          ...horo,
          operacion_id: operacion.id
        }));
        await NubeHorometros.bulkCreate(horometros, { transaction: t });
      }

      // 6️⃣ Crear checklist
      if (data.checklists && data.checklists.length > 0) {
        const checklist = data.checklists.map(chk => ({
          ...chk,
          operacion_id: operacion.id
        }));
        await NubeCheckListOperacion.bulkCreate(checklist, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json({ 
      success: true,
      operaciones_ids: idsOperacionesCreadas,
      message: 'Operación de sostenimiento creada exitosamente'
    });

  } catch (error) {
    await t.rollback();
    console.error('Error en crearOperacionSostenimiento:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: 'Error al crear la operación de sostenimiento'
    });
  }
}

async function actualizarOperacionSostenimiento(req, res) {
    const t = await sequelize.transaction();

    try {
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const resultados = [];

        for (const data of operacionesData) {
            const operacionId = data.operacion.id;
            const resultadoOperacion = {
                id: operacionId,
                success: true,
                message: 'Operación de sostenimiento actualizada correctamente'
            };

            try {
                // 1. Verificar que la operación existe
                const operacionExistente = await NubeOperacion.findByPk(operacionId, { transaction: t });
                if (!operacionExistente) {
                    throw new Error(`Operación con ID ${operacionId} no encontrada`);
                }

                // 2. Actualizar operación principal
                await NubeOperacion.update(data.operacion, {
                    where: { id: operacionId },
                    transaction: t
                });

                // 3. Eliminar y recrear relaciones en bloques atómicos por tipo
                
                // Estados y sus relaciones
                await NubeEstado.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.estados && data.estados.length > 0) {
                    const estadosCreados = await NubeEstado.bulkCreate(
                        data.estados.map(estado => ({ ...estado, operacion_id: operacionId })),
                        { transaction: t, returning: true }
                    );

                    // Procesar sostenimientos por estado
                    const interSostenimientosToCreate = [];
                    
                    for (let i = 0; i < data.estados.length; i++) {
                        const estadoData = data.estados[i];
                        const estadoCreado = estadosCreados[i];

                        if (estadoData.sostenimientos && estadoData.sostenimientos.length > 0) {
                            // Crear sostenimientos con estado_id
                            const sostenimientos = estadoData.sostenimientos.map(sost => ({
                                ...sost,
                                estado_id: estadoCreado.id,
                                operacion_id: operacionId
                            }));
                            const sostenimientosCreated = await NubeSostenimiento.bulkCreate(sostenimientos, { 
                                transaction: t, 
                                returning: true 
                            });

                            // Preparar inter-sostenimientos
                            for (let j = 0; j < estadoData.sostenimientos.length; j++) {
                                const sostenimientoData = estadoData.sostenimientos[j];
                                const sostenimientoCreated = sostenimientosCreated[j];

                                if (sostenimientoData.inter_sostenimientos && sostenimientoData.inter_sostenimientos.length > 0) {
                                    const inters = sostenimientoData.inter_sostenimientos.map(inter => ({
                                        ...inter,
                                        sostenimiento_id: sostenimientoCreated.id
                                    }));
                                    interSostenimientosToCreate.push(...inters);
                                }
                            }
                        }
                    }

                    // Bulk create inter-sostenimientos
                    if (interSostenimientosToCreate.length > 0) {
                        await NubeInterSostenimiento.bulkCreate(interSostenimientosToCreate, { transaction: t });
                    }
                }

                // Horómetros
                await NubeHorometros.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.horometros && data.horometros.length > 0) {
                    await NubeHorometros.bulkCreate(
                        data.horometros.map(horo => ({ ...horo, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Checklists
                await NubeCheckListOperacion.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.checklists && data.checklists.length > 0) {
                    await NubeCheckListOperacion.bulkCreate(
                        data.checklists.map(chk => ({ ...chk, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                resultados.push(resultadoOperacion);
            } catch (error) {
                resultadoOperacion.success = false;
                resultadoOperacion.message = `Error al actualizar operación ${operacionId}: ${error.message}`;
                resultados.push(resultadoOperacion);
                // Continuamos con las siguientes operaciones
            }
        }

        // Verificamos si hubo algún error en alguna operación
        const errores = resultados.filter(r => !r.success);
        if (errores.length > 0) {
            await t.rollback();
            return res.status(207).json({
                success: false,
                message: 'Algunas operaciones no se actualizaron correctamente',
                resultados,
                errores: errores.map(e => e.message)
            });
        }

        await t.commit();
        res.status(200).json({
            success: true,
            message: 'Todas las operaciones de sostenimiento actualizadas correctamente',
            resultados
        });

    } catch (error) {
        await t.rollback();
        console.error('Error en actualizarOperacionSostenimiento:', error);
        res.status(500).json({ 
            success: false,
            error: error.message,
            message: 'Error general en la transacción de operaciones de sostenimiento'
        });
    }
}

async function obtenerOperacionesSostenimiento(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 100; // tamaño lote
    const offset = parseInt(req.query.offset) || 0;

    const { rows, count } = await NubeOperacion.findAndCountAll({
      where: { tipo_operacion: 'SOSTENIMIENTO' },
      include: [
        {
          model: NubeEstado,
          as: 'estados',
          include: [
            {
              model: NubeSostenimiento,
              as: 'sostenimientos',
              include: [
                { model: NubeInterSostenimiento, as: 'inter_sostenimientos' }
              ]
            }
          ]
        },
        { model: NubeHorometros, as: 'horometros' },
        { model: NubeCheckListOperacion, as: 'checklists' }
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: NubeEstado, as: 'estados' }, 'numero', 'ASC']
      ],
      limit,
      offset
    });

    res.status(200).json({
      total: count,
      registros: rows
    });
  } catch (error) {
    console.error('Error en obtenerOperacionesSostenimiento:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
}


module.exports = { crearOperacionLargo,actualizarOperacionLargo, obtenerOperacionesLargo, crearOperacionHorizontal,actualizarOperacionHorizontal, obtenerOperacionesHorizontal, crearOperacionSostenimiento, actualizarOperacionSostenimiento, obtenerOperacionesSostenimiento  };