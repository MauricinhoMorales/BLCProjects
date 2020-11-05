import dbConnect from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("comentarios").insertOne({
          nombre: req.body.nombre,
          contenido: req.body.contenido,
          fecha: req.body.fecha,
          tarea_id: ObjectId(id),
          usuario_id: ObjectId(req.body.usuario_id)
        });
        res.status(201).json({ Success: "True", Data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("comentarios").find({
          tarea_id: { $eq: ObjectId(id) }
        }).toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}