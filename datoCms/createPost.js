const fs = require("fs");

const getFrontmatter = require("./getFrontmatter");
const getFilename = require("./getFilename");
const urlSanitize = require("./sanitizeUrl");
const addRecord = require("../algoliaSearch/services/content/addRecord");

/**
 * @param {object} article
 * @param {string} path
 * @param {boolean} hasChildren
 */
module.exports = (article, path, hasChildren, root) => {

    if (!article) throw `article is ${article}`;

    const fileName = getFilename(article.title, hasChildren);
    const sanitizedPath = urlSanitize(path);
    const frontmatter = getFrontmatter(article, sanitizedPath);

    // Add data to algolia content index
    addRecord(frontmatter.frontmatter);   

    // Check if we already have an existing folder and avoid creating a new folder
    if (fs.existsSync(sanitizedPath)) return root.createPost(`${sanitizedPath}/${fileName}`, "yaml", frontmatter);

    // If we get here create a new folder and create a post
    root.directory(sanitizedPath, (dir) => dir.createPost(fileName, "yaml", frontmatter));
  }