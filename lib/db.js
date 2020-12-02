const MongoClient = require('mongodb').MongoClient;
const { config } = require('../config/index');
const { ObjectId } = require('mongodb');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const HOST = encodeURIComponent(config.dbHost);

console.log(USER);
const uri = USER
  ? `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017';

class MongoLib {
  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
    this.isRejected = false;
  }

  connect() {
    if (!MongoLib.connection || this.isRejected === true) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            this.isRejected = true;
            console.log(err);
            reject(err);
          } else {
            this.isRejected = false;
            console.log('Connected successfuly');
            resolve(this.client.db(this.dbName));
          }
        });
      });
    }
    return MongoLib.connection;
  }

  disconnect() {
    this.client.close();
    MongoLib.connection = null;
  }

  getAll(collection, query) {
    return this.connect().then(async (db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }

  getClient() {
    return this.MongoClient;
  }
}

module.exports = MongoLib;
