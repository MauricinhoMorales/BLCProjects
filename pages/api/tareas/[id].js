import dbConnect from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('tareas').findOne({
          _id: ObjectId(id),
        });
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('tareas').updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
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
            },
          }
        );
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { db } = await dbConnect();
        const result = await db
          .collection('tareas')
          .deleteOne({ _id: ObjectId(id) });
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
