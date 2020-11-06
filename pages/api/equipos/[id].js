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
        const result = await db.collection('equipos').findOne({
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
        const result = await db.collection('equipos').findOneAndReplace(
          { _id: ObjectId(id) },
          {
            nombre: req.body.nombre,
            color: req.body.color,
            departamento: req.body.departamento,
            creador: ObjectId(req.body.creador),
            members: req.body.members,
            numberOfMembers: req.body.members.length || 0,
            proyectos: req.body.proyectos,
          }
        );
        res.status(200).json({ uccess: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { db } = await dbConnect();
        const result = await db
          .collection('equipos')
          .deleteOne({ _id: ObjectId(id) });
        res.status(200).json({ Success: 'True', Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
