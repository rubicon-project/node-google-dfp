[![Code Climate](https://codeclimate.com/github/ShinyAds/node-google-dfp/badges/gpa.svg)](https://codeclimate.com/github/ShinyAds/node-google-dfp) [![Test Coverage](https://codeclimate.com/github/ShinyAds/node-google-dfp/badges/coverage.svg)](https://codeclimate.com/github/ShinyAds/node-google-dfp/coverage) [![Build Status](https://travis-ci.org/ShinyAds/node-google-dfp.svg?branch=master)](https://travis-ci.org/ShinyAds/node-google-dfp)
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
dfpUser.getService('LineItemService', function (err, lineItemService) {
  if (err) {
    return console.error(err);
  }

  var statement = new DfpClass.Statement('WHERE id = 103207340');

  lineItemService.getLineItemsByStatement(statement, function (err, results) {
    console.log(results);
  });

});
```

### Service accounts example

If you would like to use a Google [Service Account](https://developers.google.com/doubleclick-publishers/docs/service_accounts) to access DFP, you can do so by creating an instance of the JWT auth client.

```JavaScript
var google = require('googleapis')

var jwtClient = new google.auth.JWT(
  SERVICE_ACCOUNT_EMAIL,
  'path/to/key.pem,
  null,
  ['https://www.googleapis.com/auth/dfp']);

dfpUser.setClient(jwtClient)

```

=======
### oAuth setup

This application requires a working oAuth refresh token to make requests. If you don't include a refresh token you will get an "No refresh token is set" error. If you include a bad token, you'll get an "illegal access" error. Service accounts are not supported.

To setup a refresh token manually, follow [Google's instructions](https://developers.google.com/accounts/docs/OAuth2ForDevices#obtainingatoken) for using cURL. The main steps are included below.

*  Setup a oAuth "installed application" in the Google Developer Console.

* Create a verification request using this installed application's client ID. (If you miss this step you'll get an `authorization_pending` error from Google on the next step.) Note that any slashes in a `device_code` will need to be escaped.

```curl -d "client_id={YOUR_OAUTH_CLIENT_ID}&scope=https://www.googleapis.com/auth/dfp" https://accounts.google.com/o/oauth2/device/code```

    {
      "device_code" : "ABCD-EFGH4/MEiMYvOO1THXLV_fHGGN8obAgb5XFs1Uctj-QsyYsQk",
      "user_code" : "ABCD-EFGH",
      "verification_url" : "https://www.google.com/device",
      "expires_in" : 1800,
      "interval" : 5
    }


* Visit the `verification_url` contained in the verification request response (e.g. https://www.google.com/device) in a browser and type in the `user_code` provided in the verification response. A verification code will be given as a response.

* Use the provided `code` and your client ID and secret from the Google oAuth application to create a refresh token.

```curl -d "client_id={YOUR_OAUTH_CLIENT_ID}&client_secret={YOUR_OAUTH_CLIENT_SECRET}&code={YOUR_VERIFICATION_CODE}&grant_type=http://oauth.net/grant_type/device/1.0" https://accounts.google.com/o/oauth2/token```

    {
      "access_token" : "ya29.JAHynQpVpjBFhvg-7VKdQ7nmD0DkmCYoWTWo535TP8QsKa6j2rFOI1i0pdclFepv_GZo9A2SrN41dA",
      "token_type" : "Bearer",
      "expires_in" : 3600,
      "id_token" : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZmM3YTJhMDkwYWJjOGYxMDU5MjJmMzFiN2FjZGUzYzA2NmU1NTYifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWQiOiIxMTU2MjQxNzA0MjQ3NzA5NDYzNzgiLCJzdWIiOiIxMTU2MjQxNzA0MjQ3NzA5NDYzNzgiLCJhenAiOiI4MzQ3MDQ2OTI1ODItMzlwY3I2M2RmNjBlZjByY2E5ZTc1cDRicTlzbjhxOWUuYXBwcy5nb29nbyV1c2VyY29udGVudC5jb20iLCJlbWFpbCI6InRheWxvci5idWxleUBtY25hdWdodG9uLm1lZGlhIiwiYXRfaGFzaCI6Ikp2Sl9JUDlxUk9zX1JUNDBoY0FSWVEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXVkIjoiODM0NzA0HjkyNTgyLTM5cGNyNjNkZjYwZWYwcmNhOWU3NXA0YnE5c244cTllLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaGQiOiJtY25hdWdodG9uLm1lZGlhIiwidG9rZW5faGFzaCI6Ikp2Sl9JSDlxUk9zX1JUNDBoY0FSWVEiLCJ2ZXJpZmllZF9lbWFpbCI6dHJ1ZSwiY2lkIjoiODM0NzA0NjkyNTgyLTM5cGNyNjNkZjYwZWYwcmNhOWU3NXA0YnE5c244cTllLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaWF0IjoxNDI0ODAwNDcwLCJleHAiOjE0MjQ4MDQzNzB9.T9mTcSl5bJLKrFhldXOd1L1CnGFfZHNF1eQOmJYyp7wR3vKbz8ATTNAfyo8_2hSGt9kGrHDBcdgaq_18RYS72Tt0MclNy020romjl6rYRjs6GH93S3ZMiwra3UI3kmDXym9kyntedMS5gIPgJWfcoh0J0CTDNPBisLNrZntJv7Y",
      "refresh_token" : "1/CGpCHgTgJ28PMnh84PgQBOgHHHaLCDbDQ_0ZiINmO_g"
    }

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
