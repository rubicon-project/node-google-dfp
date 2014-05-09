var wsdlService;

var LineItemService = function (lineItemWS) {
  wsdlService = lineItemWS;
};

LineItemService.prototype.Statement = function (query) {
  return { filterStatement: { query: query } };
};

LineItemService.prototype.createLineItems = function () {
  // body...
};

LineItemService.prototype.getLineItemsByStatement = function (statement, callback) {
  wsdlService.getLineItemsByStatement(statement,  function (err, result) {
    if (err) {
      console.log(err);
    }
    callback(result.rval.results);
  });
};

LineItemService.prototype.performLineItemAction = function () {
  // body...
};

LineItemService.prototype.updateLineItems = function () {
  // body...
};

module.exports = LineItemService;
