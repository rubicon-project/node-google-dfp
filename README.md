# Google DFP API Client for NodeJS

## Basics

Initialize the DFP Instance.

```JavaScript
var Dfp = require('node-google-dfp'),
    dfpUser = new Dfp.User(NETWORK_CODE, APP_NAME, VERSION);
```

Next, setup your client settings and your user's OAUTH token information.

```JavaScript
dfpUser.setSettings({
  client_id : "YOUR CLIENT ID",
  client_secret : "YOUR CLIENT SECRET",
  refresh_token : "A REFRESH TOKEN",
  redirect_url : "YOUR OAUTH REDIRECT URL"
});
```

You can instance any of DFP's API Services; https://developers.google.com/doubleclick-publishers/docs/start


```JavaScript
dfpUser.getService('LineItemService', function (lineItemService) {

  var statement = new DfpClass.Statement('WHERE id = 103207340');

  lineItemService.getLineItemsByStatement(statement, function (err, results) {
    console.log(results);
  });

});
```


Known Issues
------------

1. OAuth Support for more than just Refresh Token
2. No unit tests


How to contribute
-----------

Follow Github's [recommended workflow](https://help.github.com/articles/fork-a-repo) for contributing to this project.

1. Fork it
2. Create your feature branch (`git checkout -b your-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin your-new-feature`)
5. Create new Pull Request
