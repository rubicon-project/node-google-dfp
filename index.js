// https://developers.google.com/api-client-library/javascript/features/authentication
// https://github.com/google/google-api-nodejs-client/

function connect(clientId, clientSecret, consumerKey, consumerSecret, redirectUrl) {

	var googleapis = require('googleapis');
	var OAuth2 = googleapis.auth.OAuth2;

	var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

	var url = oauth2Client.generateAuthUrl({
  		access_type: 'offline',
  		scope: 'https://www.googleapis.com/auth/plus.me'
	});
}


module.exports = {
	connect: connect
};