const indexes = require("../../indexes");
const client = require("../../getClient");


module.exports = () => {

    if (!client) return;
    
    const index = client().initIndex(indexes.content);
    
    if (!index) return;

    index.setSettings({
        'searchableAttributes': [
            'bodyText',
            'lead',
            'heading'
        ]
    });

    return index;
}