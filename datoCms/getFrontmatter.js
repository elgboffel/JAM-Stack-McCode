/**
 * 
 * @param {Object} data 
 * @param {string} generatedPath
 */
module.exports = (data, generatedPath = "") => {

  if (!data) return;

  const mappedData = data.toMap(2);
  
  return {
    frontmatter: {
      type:  mappedData.itemType,
      path: generatedPath,
      ...mappedData
    }
  };
};
