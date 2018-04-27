const cherio = require('cherio');
const { readFile } = require('./fs');

readFile('./temp/chile-montanas.html')
  .then(processHtml)
  .then(data => console.log(data))
  .catch(console.error.bind(console))
;

function processHtml(data) {
  const $ = cherio.load(data);
  return $('table')
    .eq(1)
    .find('tr td:last-child a')
    .slice(1)
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
