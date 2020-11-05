import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function dbConnect(){
  if (!client.isConnected()) await client.connect();
  const db = client.db("test");
  return { db, client }
} 

export default dbConnect;