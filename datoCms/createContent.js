const fs = require("fs");
const traverse = require("./traverse");
const getFrontmatter = require("./getFrontmatter");
const getFilename = require("./getFilename");
const urlSanitize = require("./sanitizeUrl");

const rootPath = "site/content";


module.exports = (dato, root, i18n) => {

  // Create home
  root.createPost(
    `${rootPath}/_index.md`, "yaml", {
      frontmatter: {
        title: dato.frontPage.title,
        bodyText: dato.frontPage.bodyText,
        link: dato.frontPage.link.toMap(),
      }
    }
  );

  // Create articles content
  traverse(
    dato.articles.filter((article) => !article.parent),
    `${rootPath}`,
    (article, path, hasChildren) => {
      const fileName = getFilename(article.title, hasChildren);
      const sanitizedPath = urlSanitize(path);

      // Check if we already have an existing folder and avoid creating a new folder
      if (fs.existsSync(sanitizedPath)) {
        root.createPost(
          `${sanitizedPath}/${fileName}`, "yaml", 
          getFrontmatter(article)
        );
      } else {
        root.directory(sanitizedPath, (dir) => {          
          dir.createPost(
            fileName, "yaml", 
            getFrontmatter(article)
          );
        });
      }
    }
  );
};
