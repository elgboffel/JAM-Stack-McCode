function traverse(records, path, root, cb, depth) {
  records.forEach((record) => {
    const hasChildren = record.children.length > 0;
      
    // Create a new folder path if item has children
    if (hasChildren) path = `${path}/${record.title.toLowerCase()}`; 

    cb(record, path, hasChildren, root);
    traverse(record.children, path, root, cb, depth + 1);
  });
}

/**
 * 
 * @param {Object} records 
 * @param {string} path
 * @param {function()} cb
 * @param {number=} depth 
 */
module.exports = (records, path, root, cb, depth = 0) => {
  traverse(records, path, root, cb, depth);
};
