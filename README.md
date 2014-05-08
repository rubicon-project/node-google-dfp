# Google DFP API Helper for NodeJS

## Basics
```JavaScript
/*
    Initialize the DFP Instance, there is one parameter which
    allows you to supply an alternate api.properties file,
    without this parameters it will get api.properties.js in
    project root directory
*/
var DfpClass = require('./lib/DfpUser');
var dfpInst = new DfpClass(NETWORK_CODE, 'APP_NAME');
dfpInst.loadConfig();

/*
    These parameters could be filled out in the api.properties.js
    file or for greater flexibility you can code them in
*/
dfpInst.api.settings.client_id = "YOUR CLIENT ID";
dfpInst.api.settings.client_secret = "YOUR CLIENT SECRET";
dfpInst.api.settings.refresh_token = "A REFRESH TOKEN";
dfpInst.api.settings.redirect_url = "YOUR OAUTH REDIRECT URL";

/*
    You can instance any of DFP's API Services
    https://developers.google.com/doubleclick-publishers/docs/start

    Also checkout the api.properties.js file
*/
dfpInst.getService('LineItemService', function (LineItemService) {
  console.log(LineItemService); // Returns LineItemService
});
```
