const algoliasearch = require('algoliasearch');

module.exports = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
