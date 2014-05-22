// List lineitems

var Dfp = require('../lib/Dfp');
var dfpConfig = require('/dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCore, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);

dfpUser.getService('OrderService', function (orderService) {
  var args = { 
    orders: [
      {
        name: 'Multiple NodeJS Order Creation #1',
        notes: 'It cannot be this simple!',
        advertiserId: '10209990',                 // Must correspond to an advertiserId in your DFP instance
        traffickerId: '50819180'                  // Must correspond to an traffickerId in your DFP instance
      },
      {
        name: 'Multiple NodeJS Order Creation #2',
        notes: 'Really???',
        advertiserId: '10209990',
        traffickerId: '50819180'
      }
    ]
  };

  orderService.createOrders(args, function (err, results) {
    if (err) {
      console.log(err.response.body);
      return false;
    }
    console.log(results);
  });
});
