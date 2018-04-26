const crypto = require('crypto');

module.exports = {
  hash,
  sha1,
  sha256,
  sha384,
  sha512,
};

const DEFAULT_OPTIONS = {
  outputFormat: 'hex',  // hex, latin1, base64, buffer
};

/**
 *
 * @param {string} algo Algorithm to hash (sha1, sha256, sha384, sha512)
 * @param {string} data Data to hash
 * @param {object} userOptions Options
 * @param {string} userOptions.outputFormat Output format of hash (hex, latin1, base64, buffer)
 */
function hash(algo, data, userOptions = {}) {
  const options = Object.assign({}, DEFAULT_OPTIONS, userOptions);
  return crypto
    .createHash(algo)
    .digest(options.outputFormat)
  ;
}

function sha1(data, options = {}) {
  return hash('sha1', data, options);
}

function sha256(data, options = {}) {
  return hash('sha256', data, options);
}

function sha384(data, options = {}) {
  return hash('sha384', data, options);
}

function sha512(data, options = {}) {
  return hash('sha512', data, options);
}
