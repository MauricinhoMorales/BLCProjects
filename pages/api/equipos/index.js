import dbConnect from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('equipos').insertOne({
          nombre: req.body.nombre,
          color: req.body.color,
          departamento: req.body.departamento,
          creador: ObjectId(req.body.creador),
          members: req.body.members,
          numberOfMembers: req.body.members.length || 0,
          proyectos: req.body.proyectos,
        });
        res.status(201).json({ success: true, data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('equipos').find().toArray();
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false, message: e });
      }
      break;
  }
};
