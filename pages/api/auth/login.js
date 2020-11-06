import dbConnect from '../../../utils/dbConnect';
export default async (req, res) => {
  const { method } = req;
  const { body: query } = req;

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('usuarios').find(query).toArray();
        if (result) {
          if (result[0].contrasena === req.body.contrasena) {
            res.status(201).json({ success: true, data: result[0] });
          } else {
            res.status(403).json({ success: false });
          }
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
      }
      break;
  }
};
