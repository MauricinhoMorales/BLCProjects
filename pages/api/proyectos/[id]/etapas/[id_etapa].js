import dbConnect from '../../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { query: { id, id_etapa }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("etapas").findOne({
          _id: ObjectId(id_etapa)
        })
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("etapas").findOneAndReplace(
          { _id: ObjectId(id_etapa) },
          {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            progreso: req.body.progreso
          }
        )
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("etapas").deleteOne(
          { _id: ObjectId(id_etapa) },
        );
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}