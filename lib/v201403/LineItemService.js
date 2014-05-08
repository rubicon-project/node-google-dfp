var wsdlService;

var LineItemService = function (lineItemWS) {
  this.wsdlService = lineItemWS;
};

LineItemService.prototype.createLineItems = function() {
  // body...
};

LineItemService.prototype.getLineItemsByStatement = function(statement, callback) {
  this.wsdlService.getLineItemsByStatement(statement,  function (err, result) {
    if (err) {
      console.log(err);
    }
    callback(result.rval.results);
  });
};

LineItemService.prototype.performLineItemAction = function() {
  // body...
};

LineItemService.prototype.updateLineItems = function() {
  // body...
};

module.exports = LineItemService;
