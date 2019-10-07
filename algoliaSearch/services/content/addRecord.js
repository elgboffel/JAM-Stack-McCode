const index = require("./getIndex");

/**
 * @param {object} object
 */
module.exports = object => {

    if (!index || !object) throw `no algolia index or object found to add as index record`;

    // If no Algolia id exists add new record
    if (!object.algoliaId) return index().addObject(object, object.id);

    // If no record with algoli id from object exists add a new record
    if (!index().getObject(object.algoliaId)) return index().addObject(object, object.id);

    // If we get here a record already exists and overwrite with new data
    return index().saveObject(object);
}