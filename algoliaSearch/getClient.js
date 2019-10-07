const algoliasearch = require('algoliasearch');

module.exports = () => { 
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);

    if (!client) return;

    return client;
};
