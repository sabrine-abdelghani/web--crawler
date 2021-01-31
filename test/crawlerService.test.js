/* -------------------------------- Functions -------------------------------- */

import { scrapeHTMLData, findJavascriptLibraryName } from '../src/lib/crawler.service';

/* ----------------------------- scrapeHTMLData ----------------------------- */

describe('scrapeHTMLDATA', function () {
  it('scrape data from html', async function () {
    const html = '<div><a href="#"><span>this is a test</span></a></div>';
    const selector = 'a > span ';
    const node = '';
    const attr = 'textContent';
    expect(await scrapeHTMLData(html, selector, node, attr)).toStrictEqual(['this is a test']);
  });
});

/* ----------------------------- find Js library ----------------------------- */

describe('findJavascriptLibraryName', function () {
  it('Finds Javascript Library name from url', function () {
    const link = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js';
    expect(findJavascriptLibraryName(link)).toStrictEqual('bootstrap');
  });
});