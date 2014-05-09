# Google DFP API Client for NodeJS

## Basics

Initialize the DFP Instance.  The third parameter can be the filename of a DFP version configuration file.  Without that parameter, the api.properties.js file will be loaded from the project's root directory.

```JavaScript
var DfpClass = require('./lib/DfpUser');
var dfp = new DfpClass(NETWORK_CODE, APP_NAME);
```

Alternatively, you can call loadConfig() to load an alternate api.properties.js file.

```JavaScript
dfp.loadConfig(FILENAME);
```

Next, setup your client settings and your user's OAUTH token information.

```JavaScript
dfp.setSettings({
  client_id : "YOUR CLIENT ID", 
  client_secret : "YOUR CLIENT SECRET", 
  refresh_token : "A REFRESH TOKEN", 
  redirect_url : "YOUR OAUTH REDIRECT URL"
});
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

How to contribute
-----------

Follow Github's [recommended workflow](https://help.github.com/articles/fork-a-repo) for contributing to this project.

1. Fork it
2. Create your feature branch (`git checkout -b your-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin your-new-feature`)
5. Create new Pull Request
