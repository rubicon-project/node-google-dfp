# Google DFP API Helper for NodeJS

## Basics

Initialize the DFP Instance, there is one parameter which allows you to supply an alternate api.properties file, without this parameters it will get api.properties.js in project root directory

```JavaScript
var DfpClass = require('./lib/DfpUser');
var dfp = new DfpClass(NETWORK_CODE, APP_NAME);
```

These parameters could be filled out in the api.properties.js file or for greater flexibility you can code them in

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
