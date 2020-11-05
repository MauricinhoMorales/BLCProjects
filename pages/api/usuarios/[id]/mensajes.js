import dbConnect from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("mensajes").find({
          $or: [
            {
              emisor_id: { $eq: ObjectId(id) },
              destinatario_id: { $eq: ObjectId(req.body.id) }
            },
            {
              emisor_id: { $eq: ObjectId(req.body.id) },
              destinatario_id: { $eq: ObjectId(id) }
            }
          ]
        }).toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}