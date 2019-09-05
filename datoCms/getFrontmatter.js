/**
 * 
 * @param {Object} data 
 */
module.exports = (data) => {

  if (!data) return;

  const mappedData = data.toMap(2);
  
  return {
    frontmatter: {
      type:  mappedData.itemType,
      ...mappedData
    }
  };
};
