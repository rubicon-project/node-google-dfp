// List lineitems

var Dfp = require('../lib/Dfp');
var dfpConfig = require('/dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCore, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);

dfpUser.getService('OrderService', function (orderService) {
  var args = { orders: [{
      name: 'Full Campaign #27',
      notes: 'It cannot be this simple!',
      advertiserId: '10209990',                 // Must correspond to an advertiserId in your DFP instance
      traffickerId: '50819180'                  // Must correspond to an traffickerId in your DFP instance
    }]};

  orderService.createOrders(args, function (err, myOrder) {
    if (err) {
      console.log(err.response.body);
      return false;
    }
    console.log(myOrder);

    dfpUser.getService('LineItemService', function (lineItemService) {
      var li = { lineItems: [{
        orderId: parseFloat(myOrder.rval[0].id),
        name: 'Lineitem descriptive name #10',
        externalId: '#122412',
        startDateTime: new Date().ToDfpDate('Americas/Toronto'),
        startDateTimeType: 'IMMEDIATELY',
        endDateTime: new Date(2014, 6, 21, 12, 0, 0, 0).ToDfpDate('Americas/Toronto'),
        creativeRotationType: 'EVEN',
        lineItemType: 'STANDARD',
        priority: 8,
        unitsBought: 100000,
        costPerUnit: new Dfp.Money(5.6, 'CAD'),
        costType: 'CPM',
        creativePlaceholders: { size: {
          width: 728,
          height: 90,
          isAspectRatio: false
        }},
        targetPlatform: 'ANY',
        targeting: { inventoryTargeting: { targetedPlacementIds: '3980'} }
      }]};

      console.log(li.lineItems[0].startDateTime);
      console.log(li.lineItems[0].costPerUnit);
      lineItemService.createLineItems(li, function (err, myLineItem) {
        if (err) {
          console.log(err.response.body);
          return false;
        }
        console.log(myLineItem);

      });
    });
  });
});

