/**
 * @param {string} str - string to url sanitize
 */
module.exports = (str) => {
  return str.replace(/ /g, "-").toLowerCase();
};
