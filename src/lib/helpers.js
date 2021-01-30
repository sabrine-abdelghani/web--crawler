/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                   */
/* -------------------------------------------------------------------------- */

/**
 * @name sortBy
 *  Function sorts array by a given value
 * @param {*} data
 * @param {*} key
 */
export function sortBy(data, key) {
    return data.sort((a, b) => b[key] - a[key]);
  }
  
  /**
   * grouby count
   * @param {*} data array of strings
   */
  // eslint-disable-next-line no-console
export function groupBy(data) {
    const counts = data.reduce((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {});
    return Object.keys(counts).map((key) => ({ name: key, count: counts[key] }));
  }
  
  /**
   * Function do get DOM node
   * @param {*} element DOM element
   * @param {String} keys and array of keys or string
   */
  // eslint-disable-next-line no-console
export function getDOMNode(element, keys) {
    // If plain string, split it to array
    if (typeof keys === 'string') {
      keys = keys.split('.');
    }
    // Get key
    const key = keys.shift();
    // Get data for that key
    const node = element[key];
    // Check if we reached the end of query string
    if (keys.length === 0) {
      return node;
    }
    // eslint-disable-next-line no-console
    return getDOMNode(node, keys);
  }