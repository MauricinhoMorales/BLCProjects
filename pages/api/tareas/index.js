import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("tareas").find().toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}