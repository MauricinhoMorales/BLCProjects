import dbConnect from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("etapas").insertOne({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          progreso: 0,
          proyecto_id: ObjectId(id),
        });
        res.status(201).json({ Success: "True", Data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("etapas").find({
          proyecto_id: { $eq: ObjectId(id) }
        }).toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}