const cherio = require('cherio');
const { readFile } = require('./fs');

readFile('./temp/especiales.html')
  .then(processHtml)
  .then(data => console.log(data))
  .catch(console.error.bind(console))
;

function processHtml(data) {
  const $ = cherio.load(data);
  return $('#mw-content-text p a:first-child')
    .slice(3)
    .map((index, el) => {
      const $el = cherio(el);
      return {
        name: $el.text(),
        url: `http://www.wikiexplora.com${$el.attr('href')}`,
      };
    })
    .get()
  ;
}
