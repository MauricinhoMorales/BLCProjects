import dbConnect from '../../../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { query: { id, id_etapa }, method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("tareas").insertOne({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          estado: req.body.estado,
          prioridad: req.body.prioridad,
          progreso: 0,
          fecha_entrega: req.body.fecha_entrega,
          tiempo_estimado: req.body.tiempo_estimado,
          etapa_id: ObjectId(id_etapa),
          responsable_id: ObjectId(req.body.responsable_id)
        });
        res.status(201).json({ Success: "True", Data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("tareas").find({
          etapa_id: { $eq: ObjectId(id_etapa) }
        }).toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}