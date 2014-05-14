
function Statement(query) {
  return { filterStatement: { query: query } };
};


module.exports = Statement;