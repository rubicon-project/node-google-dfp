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

### oAuth setup

This application requires a working oAuth refresh token to make requests. If you don't include a refresh token you will get an "No refresh token is set" error. If you include a bad token, you'll get an "illegal access" error. Service accounts are not supported.

To setup a refresh token manually, follow [Google's instructions](https://developers.google.com/accounts/docs/OAuth2ForDevices#obtainingatoken) for using cURL. The main steps are included below.

0. Setup a oAuth "installed application" in the Google Developer Console.

1. Create a verification request using this installed application's client ID. (If you miss this step you'll get an `authorization_pending` error from Google on the next step.) Note that any slashes in a `device_code` will need to be escaped.

```curl -d "client_id={YOUR_OAUTH_CLIENT_ID}&scope=email profile" https://accounts.google.com/o/oauth2/device/code```
    
    {
      "device_code" : "ABCD-EFGH4/MEiMYvOO1THXLV_fHGGN8obAgb5XFs1Uctj-QsyYsQk",
      "user_code" : "ABCD-EFGH",
      "verification_url" : "https://www.google.com/device",
      "expires_in" : 1800,
      "interval" : 5
    }
    

2. Visit the `verification_url` contained in the verification request response (e.g. https://www.google.com/device) in a browser and type in the `user_code` provided in the verification response. A verification code will be given as a response.

3. Use the provided `code` and your client ID and secret from the Google oAuth application to create a refresh token.

```curl -d "client_id={YOUR_OAUTH_CLIENT_ID}&client_secret={YOUR_OAUTH_CLIENT_SECRET}&code={YOUR_VERIFICATION_CODE}&grant_type=http://oauth.net/grant_type/device/1.0" https://accounts.google.com/o/oauth2/token```

You can use `urn:ietf:wg:oauth:2.0:oob` for the redirect URL of non-public apps.

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
