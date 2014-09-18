// List lineitems

var Dfp = require('node-google-dfp');
var dfpConfig = require('./dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCore, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);

dfpUser.getService('LineItemService', function (lineItemService) {

  var query = new Dfp.Statement('LIMIT 10');

  lineItemService.getLineItemsByStatement(query, function (err, results) {
    if (err)
      return console.log('ERROR', err);
    console.log('results', results);
  });
});

