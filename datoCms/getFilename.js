const urlSanitize = require("./sanitizeUrl");

/**
 * 
 * @param {string} title 
 * @param {booleab} isListPage 
 */
module.exports = (title, isListPage) => {
  
  //If item has children create a list page _index.md or create a single page
  return isListPage ? "_index.md" : `${urlSanitize(title)}.md`;
};
