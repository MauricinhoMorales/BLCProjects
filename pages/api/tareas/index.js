import dbConnect from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('tareas').insertOne({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          estado: req.body.estado,
          prioridad: req.body.prioridad,
          color: req.body.color,
          proyecto_id: ObjectId(req.body.proyecto_id),
          secciones: req.body.secciones,
          progreso: req.body.progreso,
          fecha_entrega: req.body.fecha_entrega,
          responsable_id: ObjectId(req.body.responsable_id),
        });
        res.status(201).json({ success: true, data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('tareas').find().toArray();
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
