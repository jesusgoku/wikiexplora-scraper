const axios = require('axios');

const COUCHDB_DSN = process.env.COUCHDB_DSN;

module.exports = {
  createDocument,
  updateDocument,
};

function createDocument(data) {
  return axios
    .post(`${COUCHDB_DSN}`, data)
    .then(processResponse)
  ;
}

function updateDocument(id, data) {
  return axios
    .post(`${COUCHDB_DSN}/${id}`, data)
    .then(processResponse)
  ;
}

function processResponse(res) {
  return res.data;
}
