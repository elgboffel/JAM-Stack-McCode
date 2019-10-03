const fs = require("fs");
const chalk = require("chalk");

const traverse = require("./traverse");
const getFrontmatter = require("./getFrontmatter");
const getFilename = require("./getFilename");
const urlSanitize = require("./sanitizeUrl");

const rootPath = "site/content";


module.exports = (dato, root, i18n) => {

  if (process.env.INCOMING_HOOK_BODY) {
    const json = JSON.parse(process.env.INCOMING_HOOK_BODY)
    console.log(chalk.magenta("################### Incoming Hook Body ###################"));
    console.log(chalk.magenta(process.env.INCOMING_HOOK_BODY));
    console.log(chalk.magenta(json.entity_id));
    console.log(chalk.magenta(dato.find(json.entity_id).toMap()));
    console.log(chalk.magenta("asString", dato.find(json.entity_id).entity.payload));
    console.log(chalk.magenta("################### Incoming Hook Body End ###################"));
  }

  const item = dato.find(1406714);
  console.log(chalk.cyan("################### TEST ###################"));

  console.log(item.toMap());

  console.log(chalk.cyan("################### TEST ###################"));

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
