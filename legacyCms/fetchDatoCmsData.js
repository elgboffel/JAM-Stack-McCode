require("babel-polyfill");
const SiteClient = require("datocms-client").SiteClient;
const chalk = require("chalk");

// eslint-disable-next-line no-undef
const client = new SiteClient(process.env.DATO_API_TOKEN);


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

  // fetchContentTypes()
  //   .then(() => fetchEntriesForAllContentTypes())
  //   .then(() => createHugoContent(_entries));

  client.itemTypes.all()
    .then((models) => console.log("DatoCms", models));
};
