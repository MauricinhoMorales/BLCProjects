import dbConnect from '../../../utils/dbConnect';
export default async (req, res) => {
  const { email } = req.body;

  try {
    const { db } = await dbConnect();
    const result = await db.collection('usuarios').find().toArray();
    console.log(result);
    if (result) {
      result.map((value) => {
        if (value.correo === email) {
          console.log('There is a email');
        }
      });
    }
    res.status(201).json({ success: true, data: result });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};
