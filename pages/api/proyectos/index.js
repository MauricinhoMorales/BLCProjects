import dbConnect from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('proyectos').insertOne({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          color: req.body.color,
          creador: ObjectId(req.body.creador),
          progreso: 0,
          equipo_id: ObjectId(req.body.equipo_id),
          secciones: req.body.secciones,
        });
        res.status(201).json({ success: true, data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('proyectos').find().toArray();
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false, message: e });
      }
      break;
  }
};
