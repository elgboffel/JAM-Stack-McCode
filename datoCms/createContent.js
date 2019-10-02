const fs = require("fs");
const chalk = require("chalk");

const traverse = require("./traverse");
const getFrontmatter = require("./getFrontmatter");
const getFilename = require("./getFilename");
const urlSanitize = require("./sanitizeUrl");

const rootPath = "site/content";


module.exports = (dato, root, i18n) => {

  console.log(chalk.magenta("################### Incoming Hook Body ###################"));
  console.log(chalk.magenta(process.env.INCOMING_HOOK_BODY));
  console.log(chalk.magenta(process.env.INCOMING_HOOK_BODY.entity_id));
  console.log(chalk.magenta(dato.find(process.env.INCOMING_HOOK_BODY.entity_id).toMap()));
  console.log(chalk.magenta("################### Incoming Hook Body End ###################"));


  // Create home
  root.createPost(
    `${rootPath}/_index.md`, "yaml", {
      frontmatter: {
        heroSlider: dato.frontPage.heroSlider.toMap(),
        heading: dato.frontPage.heading,
        bodyText: dato.frontPage.bodyText,
        link: dato.frontPage.link.toMap(),
        linkName: dato.frontPage.linkName
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
