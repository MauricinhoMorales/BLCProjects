import dbConnect from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("proyectos").insertOne({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          progreso: 0,
          equipo_id: ObjectId(req.body.equipo_id)
        });
        res.status(201).json({ Success: "True", Data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("proyectos").find().toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}