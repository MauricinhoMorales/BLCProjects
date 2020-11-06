import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  const { method } = req;

  const query = { correo: req.params.correo, nombre: req.params.nombre };

  Object.keys(query).forEach((key) => {
    if (query[key] === undefined) {
      delete query[key];
    }
  });

  switch (method) {
    case 'POST':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('usuarios').insertOne({
          nombre: req.body.nombre,
          correo: req.body.correo,
          contrasena: req.body.contrasena,
        });
        res.status(201).json({ success: true, data: result.ops[0] });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const { db } = await dbConnect();
        const result = await db.collection('usuarios').find(query).toArray();
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
