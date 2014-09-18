// List lineitems

var Dfp = require('node-google-dfp');
var dfpConfig = require('./dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCore, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);

dfpUser.getService('OrderService', function (orderService) {
  var args = { orders: [{
      name: 'Full Campaign #67',
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
        costPerUnit: Dfp.Money(5.6, 'CAD'),
        costType: 'CPM',
        creativePlaceholders: { size: {
          width: 728,
          height: 90,
          isAspectRatio: false
        }},
        targetPlatform: 'ANY',
        targeting: { inventoryTargeting: { targetedPlacementIds: '3980'} }
      }]};

      lineItemService.createLineItems(li, function (err, myLineItem) {
        if (err) {
          console.log(err.response.body);
          return false;
        }
        console.log(myLineItem);

        dfpUser.getService('CreativeService', function (creativeService) {
          var cr = { creatives: [{
            attributes: { 'xsi:type': 'ImageCreative' },  // Read Creative.Type - https://developers.google.com/doubleclick-publishers/docs/reference/v201403/CreativeService.BaseImageCreative
            advertiserId: '10209990',                     // Must correspond to an advertiserId in your DFP instance
            name: 'My Creative #1',
            size: {
              width: 728,
              height: 90,
              isAspectRatio: false
            },
            destinationUrl: 'www.google.com',
            primaryImageAsset: {
              assetByteArray: Dfp.assetByteArray('/home/img/Pictures/myPic.jpg'), // Use your own creative
              fileName: 'image_name_001'
            }
          }]};

          creativeService.createCreatives(cr, function (err, myCreative) {
            if (err) {
              console.log(err.response.body);
              return false;
            }
            console.log(myCreative);

            dfpUser.getService('LineItemCreativeAssociationService', function (licaService) {
              var lica = { lineItemCreativeAssociations: [{
                lineItemId: myLineItem.rval[0].id,
                creativeId: myCreative.rval[0].id
              }]};

              licaService.createLineItemCreativeAssociations(lica, function (err, myLICA) {
                if (err) {
                  console.log(err.response.body);
                  return false;
                }
                console.log(myLICA);

                var approveAndOverbook = {
                  orderAction: {
                    attributes: { 'xsi:type': 'ApproveAndOverbookOrders' },
                    skipInventoryCheck: true
                  },
                  filterStatement: { query: 'WHERE id = ' + myOrder.rval[0].id }
                };

                orderService.performOrderAction(approveAndOverbook, function (err, approval) {
                  if (err) {
                    console.log(err.response.body);
                    return false;
                  }
                  console.log(approval);
                });
              });
            });
          });
        });
      });
    });
  });
});
