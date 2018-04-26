const fs = require('fs');
const axios = require('axios');
const cherio = require('cherio');
const { sha256 } = require('./hash');
const { createDocument } = require('./database');

const attributes = [
  'Ubicación',
  'Belleza',
  'Atractivos',
  'Duración',
  'Exigencia',
  'Dificultad',
  'Sendero',
  'Señalización',
  'Infraestructura',
  'Altitud',
  'Topología',
  'Desniveles',
  'Distancia (k)',
  'Altitud media',
  'Primer autor',
  // 'Descargar KMZ/GPX',
];

const url = 'http://www.wikiexplora.com/Cerro_La_Cruz';
// const url = 'http://www.wikiexplora.com/Pochoco';
// const url = 'http://www.wikiexplora.com/Cerro_Pintor';

// axios
//   .get(url)
//   .then(data => { console.log(data); return data; })
//   .then(data => cherio.load(data.data))
//   .then(parseData)
//   .then(filterAttributes)
//   .then(data => console.log(data))
//   .catch(console.log.bind(console))
// ;

readFile('./temp/la-cruz.html')
  // .then(data => cherio.load(data))
  .then(parseData)
  // .then(persistDataForUrl(url))
  .then(data => console.log(data))
  .catch(console.log.bind(console))
;

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

function parseData(data) {
  const $ = cherio.load(data);
  return {
    name: parseName($),
    attributes: filterAttributes(parseAttributes($)),
    kmz: parseKMZ(data),
    html: $.html(),
  };
}

function parseName($) {
  return $('#firstHeading').text().trim();
}

function parseKMZ(data) {
  const match = String(data).match(/http:\/\/www\.wikiexplora\.com\/.+\.kmz/);
  return match.length ? match[0] : null;
}

function parseAttributes($) {
  return $('.infobox tbody tr')
    .map((i, el) => {
      const $el = cherio(el);
      const $th = $el.find('th');

      if (!$th) {
        return;
      }

      return { [$th.text().trim()]: $el.find('td').text().trim() };
    })
    .get()
    .filter(i => !!i)
  ;
}

function filterAttributes(data) {
  return data
    .filter((a, b) => attributes.indexOf(Object.keys(a)[0]) !== -1)
    .reduce((o, i) => {
      o[Object.keys(i)[0]] = Object.values(i)[0];
      return o;
    }, {})
  ;
}

function normalizeAttributes(data) {}

function persistDataForUrl(url) {
  return data => {
    const payload = Object.assign({}, {
      _id: sha256(url),
    }, data);

    return createDocument(payload);
  }
}
