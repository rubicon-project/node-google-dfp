# Google DFP API Helper for NodeJS

## Basics

Initialize the DFP Instance, there is one parameter which allows you to supply an alternate api.properties file, without this parameters it will get api.properties.js in project root directory

```JavaScript
var DfpClass = require('./lib/DfpUser');
var dfp = new DfpClass(NETWORK_CODE, APP_NAME);
dfp.loadConfig();
```

These parameters could be filled out in the api.properties.js file or for greater flexibility you can code them in

```JavaScript
<<<<<<< HEAD
dfp.setSettings({
  client_id : "YOUR CLIENT ID", 
  client_secret : "YOUR CLIENT SECRET", 
  refresh_token : "A REFRESH TOKEN", 
  redirect_url : "YOUR OAUTH REDIRECT URL"
});
=======
dfp.api.settings.client_id = "YOUR CLIENT ID";
dfp.api.settings.client_secret = "YOUR CLIENT SECRET";
dfp.api.settings.refresh_token = "A REFRESH TOKEN";
dfp.api.settings.redirect_url = "YOUR OAUTH REDIRECT URL";
>>>>>>> parent of 60bd399... changed the readme
```

You can instance any of DFP's API Services; https://developers.google.com/doubleclick-publishers/docs/start
Also checkout the api.properties.js file.

```JavaScript
dfp.getService('LineItemService', function (lineItemService) {

  var statement = lineItemService.Statement('WHERE id = 103207340');

  lineItemService.getLineItemsByStatement(statement, function (results) {
    console.log(results);
  });

});
```
