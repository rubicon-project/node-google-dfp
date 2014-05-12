var ServiceUtil = function (serviceIn) {
  serviceIn.prototype.Statement = function (query) {
    return { filterStatement: { query: query } };
  };
};

module.exports = ServiceUtil;
