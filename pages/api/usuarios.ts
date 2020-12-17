import { NextApiRequest, NextApiResponse } from 'next';

export default async function getProyectos(req: NextApiRequest, res: NextApiResponse) {

  try {
    res.status(201);
    res.json("usuario");
  } catch (e) {
    res.status(500);
    res.json({ error: "No se pudo actualizar la base de datos" });
  } finally {
  }
}
