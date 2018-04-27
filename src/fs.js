const fs = require('fs');

module.exports = {
  readFile,
};

function readFile(filePath) {
  return new Promise((resolve ,reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}
