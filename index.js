// https://developers.google.com/api-client-library/javascript/features/authentication
// https://github.com/google/google-api-nodejs-client/

var googleapis = require('googleapis');
var OAuth2 = googleapis.auth.OAuth2;

var DFP_OAUTH2_SCOPE = 'https://www.google.com/apis/ads/publisher/';


var NodeGoogleDfp = function () {};

NodeGoogleDfp.version = 'v201403';
NodeGoogleDfp.clientId = '';
NodeGoogleDfp.clientSecret = '';
NodeGoogleDfp.redirectUrl = '';
NodeGoogleDfp.oauth2Client = {};


NodeGoogleDfp.prototype.setup = function(clientId, clientSecret, RedirectUrl, appName, dfpVersion) {

	this.clientId = clientId;
	this.clientSecret = clientSecret;
	this.redirectUrl = redirectUrl;
	this.appName = appName;

	if (dfpVersion)
		this.version = dfpVersion;

	return this;
};


NodeGoogleDfp.prototype.getAuthenticationUrl = function() {

	this.oauth2Client = new OAuth2(this.clientId, this.clientSecret, this.redirectUrl);

	var url = this.oauth2Client.generateAuthUrl({
  		access_type: 'offline',
  		scope: DFP_OAUTH2_SCOPE
	});

	return url;
};


NodeGoogleDfp.prototype.setAuthenticationTokenCode = function(code, callback) {

	this.oauth2Client = new OAuth2(this.clientId, this.clientSecret, this.redirectUrl);

	this.oauth2Client.getToken(code, function(err, tokens) {
		this.oauth2Client.setCredentials(tokens);
		if (callback)
			callback(tokens);
	});

	return this;
};


NodeGoogleDfp.prototype.setAuthenticationTokens = function(accessToken, refreshToken) {
	this.oauth2Client.setCredentials({access_token:accessToken, refresh_token: refreshToken});
};


NodeGoogleDfp.prototype.connect = function(networkCode, clientSecret) {

};


module.exports = NodeGoogleDfp;
