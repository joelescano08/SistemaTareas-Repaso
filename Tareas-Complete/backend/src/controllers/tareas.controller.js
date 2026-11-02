import db from '../db.js';

export const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const usuarioId = req.usuario.id; 

    if (!titulo) return res.status(400).json({ error: 'El título es obligatorio' });

    const nuevaTarea = await db.tarea.create({
      data: { titulo, descripcion, usuarioId },
    });
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerMisTareas = async (req, res) => {
  try {
    const tareas = await db.tarea.findMany({
      where: { usuarioId: req.usuario.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};