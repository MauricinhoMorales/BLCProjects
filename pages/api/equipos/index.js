import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("equipos").insertOne({
          nombre: req.body.nombre,
          departamente: req.body.departamento,
        });
        res.status(201).json({ Success: "True", Data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection("equipos").find().toArray();
        res.status(200).json({ Success: "True", Data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
}