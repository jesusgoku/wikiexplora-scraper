const cherio = require('cherio');
const { JSDOM } = require('jsdom');
const { readFile } = require('./fs');

Promise
  .all([
    readFile('./temp/search-advanced-chile-01.html'),
    readFile('./temp/search-advanced-chile-02.html'),
  ])
  .then(files => files.map(processHtmlWithJSDOM))
  .then(datasets => Array.prototype.concat.apply([], datasets))
  // .then(processHtml)
  // .then(processHtmlWithJSDOM)
  // .then(console.log.bind(console))
  .then(data => console.log(JSON.stringify(data)))
  .catch(console.error.bind(console))
;

function processHtml(html) {
  const $ = cherio.load(html);
  return $('ul')
    .first()
    .find('a')
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

function processHtmlWithJSDOM(html) {
  const { document } = (new JSDOM(html, { url: 'http://www.wikiexplora.com' })).window;

  const ul = document.querySelectorAll('ul')[0];
  const a = Array.prototype.slice.call(ul.querySelectorAll('a'), 0);
  return a.map(el => ({ name: el.textContent, url: el.href }));
}
