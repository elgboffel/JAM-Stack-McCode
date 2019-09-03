const contentful = require("contentful");
const chalk = require("chalk");
const createHugoContent = require("./createHugoContent");

const SPACE_ID = "j8n68qhi3113";
const ACCESS_TOKEN = "TTvHLOw6zTumPdBVfuaBZTwhnsudAKOwaXo-JUsEXe8";

const _client = contentful.createClient({
// This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});

const _contentTypes = [];
const _entries = [];


/**
 * Load all Content Types in your space from Contentful
 */
function fetchContentTypes() {


  return _client.getContentTypes()
    .then((response) => {

      if (!response) return console.log(chalk.red("\nError occurred while fetching Content"));

      pushToArray(response.items, _contentTypes);

    })
    .catch((error) => {
      console.log(chalk.red("\nError occurred while fetching Content Types:"));
      console.error(error);
    });
}


function fetchEntriesForAllContentTypes() {
  const numberOfContentTypes = _contentTypes.length;

  if (_contentTypes < 1) return console.log(chalk.red("\nNo content types where found to fetch entries from"));

  const promises = [];

  for (let index = 0; index < numberOfContentTypes; index++) {
    const contentType = _contentTypes[index];

    promises.push(fetchEntriesForContentType(contentType));
  }

  // eslint-disable-next-line no-undef
  return Promise.all(promises);
}


/**
 * Load all entries for a given Content Type from Contentful
 * @param {Object} contentType
 */
function fetchEntriesForContentType(contentType) {


  return _client.getEntries({
    content_type: contentType.sys.id
  })
    .then((response) => {
      if (!response) return console.log(chalk.red("\nError occurred while fetching entries"));

      pushToArray(response.items, _entries);

    })
    .catch((error) => {
      console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`));
      console.error(error);
    });
}


/**
 *
 * @param {Array} items - items to push to array.
 * @param {Array} arrayToPopulate - array to receive items.
 */
function pushToArray(items, arrayToPopulate) {

  const responseItemsLength = items.length;

  for (let index = 0; index < responseItemsLength; index++) arrayToPopulate.push(items[index]);
}


module.exports = function() {

  console.log(chalk.magentaBright("\n-------------------------------------\n   Pulling Data from Contentful...\n-------------------------------------\n"));

  fetchContentTypes()
    .then(() => fetchEntriesForAllContentTypes())
    .then(() => createHugoContent(_entries));
};
