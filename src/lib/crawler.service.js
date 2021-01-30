/* --------------------------------- helpers -------------------------------- */

import { sortBy, groupBy, getDOMNode } from './helpers';

/* -------------------------------------------------------------------------- */
/*                               Functions                                    */
/* -------------------------------------------------------------------------- */

/**
 * function to load html from site url
 * @param {String} url link
 * e.g: https://google.com/
 */
export async function loadHTML(url) {
  try {
    // sending requset to a proxy to avoid cors issue
    // see more at https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, { headers:  {
      'Access-Control-Allow-Origin': '*',
    }});
    return response.text();
  } catch (error) {
    return error;
  }
}

/**
 * Function to scrape html
 * @param {String} html e.g '<html>....</html>
 * @param {String} selector seletcor of DOM e.g: div > a > span
 * @param {String} node path of document node
 * @param {String} attr attribute to be extracted
 */
export async function scrapeHTMLData(html, selector, node, attr) {
  // parse html
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.querySelectorAll(selector);
  let list = [];
  elements.forEach((element) => {
    list = [...list, node ? getDOMNode(element, node)[attr] : element[attr]];
  });
  // Using Set To avoid duplicated values
  return [...new Set(list)];
}

/**
 * Function to extract Javascript library Name from link
 * @param {*} url link of javascript library
 */
// eslint-disable-next-line
export const findJavascriptLibraryName = (url) => {
  // eslint-disable-next-line
  if (!(!url || /^\s*$/.test(url))) {
    // eslint-disable-next-line
    const matches = /\/([^\/]+)\.(js)/.exec(url);
    if (matches) {
      return matches[1].replace('.min', '');
    }
  }
};

/**
 * Function to extract Javascript library links
 * @param {string} url
 */
export const getJavascriptLibraries = async (url) => {
  try {
    const html = await loadHTML(url);
    const pageLinks = await scrapeHTMLData(html, 'script', '', 'src');
    // find libraries and Filter undefined values
    return pageLinks.map((i) => findJavascriptLibraryName(i)).filter(Boolean);
  } catch (error) {
    return error;
  }
};

/* ------------------------------ MAIN FUNCTION ----------------------------- */

/**
 * Main function scrapes links and  counts the  top N Javascript library used.
 * @param {String} searchTerm
 * @param {String} limit
 */
export const extractLibraries = async (searchTerm, limit = 5) => {
  try {
    // Load google search result
    const response = await loadHTML(`https://google.com/search?q=${searchTerm}`);
    // find links
    const links = await scrapeHTMLData(response, 'a > div > cite', 'parentNode.parentNode', 'href');

    let list = [];
    for  (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      const result = await getJavascriptLibraries(link);
      list = [...list, ...result];
    }
    // Counting, then sorting library and
    // finally get top N values (according to limit value)
    return sortBy(groupBy(list), 'count').slice(0, limit);
  } catch (error) {
    return error;
  }
};
