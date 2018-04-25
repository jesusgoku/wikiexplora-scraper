const fs = require('fs');
const axios = require('axios');
const cherio = require('cherio');

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

axios
  .get(url)
  .then(data => { console.log(data); return data; })
  .then(data => cherio.load(data.data))
  .then(parseAttributes)
  .then(filterAttributes)
  .then(data => console.log(data))
  .catch(console.log.bind(console))
;

// readFile('./index.html')
//   .then(data => cherio.load(data))
//   .then(parseAttributes)
//   .then(filterAttributes)
//   .then(data => console.log(data))
//   .catch(console.log.bind(console))
// ;

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
