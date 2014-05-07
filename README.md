```
var DfpClass = require('./lib/DfpUser');
var dfpInst = new DfpClass(NETWORK_CODE, APP_NAME);

dfpInst.loadConfig(); // Initialize to default config

dfpInst.api.settings.client_id = "YOUR CLIENT ID";
dfpInst.api.settings.client_secret = "YOUR CLIENT SECRET";
dfpInst.api.settings.refresh_token = "A REFRESH TOKEN"; // assumes user already authorized you
dfpInst.api.settings.redirect_url = "YOUR OAUTH REDIRECT URL";

dfpInst.getService('LineItemService', function (LineItemService) {
  console.log(LineItemService); // Returns LineItemService
});
```
