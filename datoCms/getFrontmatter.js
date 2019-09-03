/**
 * 
 * @param {Object} data 
 */
module.exports = (data, path) => {

  if (!data) return;

  const mappedData = data.toMap(2);
  
  return {
    frontmatter: {
      type:  mappedData.itemType,
      url: path,
      ...mappedData
    }
  };
};
