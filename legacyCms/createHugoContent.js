const chalk = require("chalk");
// const yaml = require("js-yaml");
const jsonToYaml = require("json-to-pretty-yaml");
const fs = require("fs");
const mkdirp = require("mkdirp");

let _entries = [];

const _contentRootPath = "site/content";

/**
 * Get content from entry and populate content object.
 * @param {Object} entry - Entry object from contentful.
 * @return {Object}
 */
function getContentAsObject(entry) {
  const content = {};
  const fields = entry.fields;

  content.updated = entry.sys.updatedAt;
  content.createdAt = entry.sys.createdAt;
  content.date = entry.sys.createdAt;

  if (entry.fields < 1) return;

  const fieldKeys = Object.keys(fields);

  for (const fieldKey of fieldKeys) {
    const field = fields[fieldKey];

    if (!field) continue;

    content[fieldKey] = field;
  }

  return content;
}

/**
 * Create content for Hugo.
 * @param {Object} entry - Contentful entry item.
 */
function createContent(entry) {
  let fileContent = "";

  if (!entry) return;

  if (!entry.fields.name) return console.log(chalk.yellow(`\nCould not find name for entry with sys.id: ${entry.sys.id}`));

  const contentPath = `${_contentRootPath}/${entry.fields.name.replace(/\s+/g, "-").toLowerCase()}`;

  //Create directory
  mkdirp.sync(contentPath);
  const content = getContentAsObject(entry);

  fileContent += jsonToYaml.stringify(content);

  //Create file
  fs.writeFile(`${contentPath}/index.md`, fileContent, (error) => {
    if (error) console.log(error);
  });
}


/**
 * Create entries
 */
function createEntries() {
  const numberOfEntries = _entries.length;

  for (let index = 0; index < numberOfEntries; index++) {
    const entry = _entries[index];

    createContent(entry);
  }
}

module.exports = function(entries) {
  console.log(chalk.magentaBright("\n---------------------------------------------\n   Creating Hugo data..\n---------------------------------------------\n"));

  _entries = entries;

  if (_entries.length < 1) return console.log(chalk.red("\nNo entries where found to create Hugo content"));

  createEntries();

  console.log(chalk.magentaBright("\n---------------------------------------------\n   Finished creating Hugo data..\n---------------------------------------------\n"));

};
