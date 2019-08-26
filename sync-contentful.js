const contentful = require("contentful");
const chalk = require("chalk");

const SPACE_ID = "j8n68qhi3113";
const ACCESS_TOKEN = "TTvHLOw6zTumPdBVfuaBZTwhnsudAKOwaXo-JUsEXe8";

const client = contentful.createClient({
// This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});


/**
 * Load all Content Types in your space from Contentful
 */
function fetchContentTypes() {
  return client.getContentTypes()
    .then((response) => response.items)
    .catch((error) => {
      console.log(chalk.red("\nError occurred while fetching Content Types:"));
      console.error(error);
    });
}


/**
 * Load all entries for a given Content Type from Contentful
 * @param {*} contentType
 */
function fetchEntriesForContentType(contentType) {
  return client.getEntries({
    content_type: contentType.sys.id
  })
    .then((response) => response.items)
    .catch((error) => {
      console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`));
      console.error(error);
    });
}


module.exports = function() {
  fetchContentTypes()
    .then((contentTypes) => console.log(contentTypes.field));
//   console.log(chalk.red(fetchEntriesForContentType()));
};
