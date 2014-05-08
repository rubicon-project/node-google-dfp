var api,
  networkCode,
  applicationName;

var DfpUser = function (netCode, appName) {

  this.networkCode = netCode;
  this.applicationName = appName;

};


DfpUser.prototype.loadConfig = function (file) {

  if (file === undefined) {
    this.api = require('../api.properties');
  } else {
    this.api = require(file);
  }

};


DfpUser.prototype.getSOAPHeader = function (tokens) {

  return { RequestHeader : {
    attributes: {
      'soapenv:actor': "http://schemas.xmlsoap.org/soap/actor/next",
      'soapenv:mustUnderstand': 0,
      'xsi:type': "ns1:SoapRequestHeader",
      'xmlns:ns1': "https://www.google.com/apis/ads/publisher/" + this.api.version,
      'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
      'xmlns:soapenv': "http://schemas.xmlsoap.org/soap/envelope/"
    },
    networkCode: this.networkCode,
    applicationName: this.applicationName,
    authentication: { attributes:
      {'xsi:type': 'ns1:OAuth', 'xmlns:xsd': "http://www.w3.org/2001/XMLSchema"},
      parameters: tokens.token_type + ' ' + tokens.access_token }
  }};

};


DfpUser.prototype.getService = function (service, callback, version) {

  var soap = require('soap');
  var gapi = require('googleapis');
  var Oath = gapi.auth.OAuth2;
  var soap_wsdl = '';
  var dfpUser = this;
  var callbackFunction = callback;

  if (version === undefined) {

    if (this.api.services[service] === undefined) {
      throw new Error('Service not found');
    }

    soap_wsdl = this.api.services[service];
  } else {
    soap_wsdl = this.api.base_api_url + '/' + version + '/' + service + '?wsdl';
  }

  var oathClient = new Oath(this.api.settings.client_id, this.api.settings.client_secret, this.api.settings.redirect_url);
  oathClient.credentials = { refresh_token: this.api.settings.refresh_token };

  oathClient.refreshAccessToken(function (err, tokens) {
    if (err) {
      console.log('Refresh Token Error ' + err);
      throw new Error('Unable to get token');
    }

    soap.createClient(soap_wsdl, function (err, client) {
      if (err) {
        console.log('Create Client Error ' + err);
        throw new Error('Unable to get token');
      }

      client.addSoapHeader(dfpUser.getSOAPHeader(tokens), 'RequestHeader', 'tns', '');
      callbackFunction(client[service][service + 'InterfacePort']);

    });

  });

};

module.exports = DfpUser;
