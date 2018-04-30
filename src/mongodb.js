const { MongoClient } = require('mongodb');

const MONGODB_DSN = process.env.MONGODB_DSN;

module.exports = {
  insertOne,
  insertMany,
  updateOne,
  updateMany,
};

function mongoConnect(url = MONGODB_DSN) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err);
      }

      resolve(client);
    });
  });
}

function insertOne(collection, document, options = null) {
  return mongoConnect()
    .then(db => {
      db.collection(collection).insertOne(document, options)
    });
}

function insertMany(collection, documents, options = null) {
  return mongoConnect()
    .then(db =>
      db.collection('collection').insertMany(documents, options)
    );
}

function updateOne(collection, filter, update, options = null) {
  return new Promise((resolve, reject) => {
    mongoConnect()
    .then(client =>
      client
        .db()
        .collection(collection)
        .updateOne(filter, update, options, (err, data) => {
          client.close();
          if (err) {
            reject(err);
          }
          resolve(data);
        })
    );
  });
}

function updateMany(collection, filter, update, options = null) {
  return mongoConnect()
    .then(db =>
      db.collection(collection).updateMany(filter, update, options)
    );
}

function drop(collection, options) {
  return mongoConnect()
    .then(db => db.collection(collection).drop(options));
}

function find(collection, query) {
  return mongoConnect()
    .then(db =>
      db.collection(collection).find(query)
    );
}
