var api = null,
    networkCode = '',
    applicationName = '';

var DfpUser = function (netCode, appName) {

  networkCode = netCode;
  applicationName = appName;
  this.loadConfig();

};


DfpUser.prototype.loadConfig = function (file) {

  if (!file) {
    api = require('../api.properties');
  } else {
    api = require(file);
  }

};


DfpUser.prototype.setSettings = function(settings) {
  api.settings = settings;
}


DfpUser.prototype.getSOAPHeader = function (token) {

  return { 
    RequestHeader : {
      attributes: {
        'soapenv:actor':            "http://schemas.xmlsoap.org/soap/actor/next",
        'soapenv:mustUnderstand':   0,
        'xsi:type':                 "ns1:SoapRequestHeader",
        'xmlns:ns1':                "https://www.google.com/apis/ads/publisher/" + api.version,
        'xmlns:xsi':                "http://www.w3.org/2001/XMLSchema-instance",
        'xmlns:soapenv':            "http://schemas.xmlsoap.org/soap/envelope/"
      },
      networkCode: networkCode,
      applicationName: applicationName,
      authentication: { 
        attributes: {
          'xsi:type': 'ns1:OAuth', 
          'xmlns:xsd': "http://www.w3.org/2001/XMLSchema"
        },
        parameters: token.token_type + ' ' + token.access_token
      }
    }
  };

};


DfpUser.prototype.getService = function (service, callback, version) {

  var soap = require('soap');
  var gapi = require('googleapis');
  var Oath = gapi.auth.OAuth2;
  var soap_wsdl = '';
  var dfpUser = this;
  var useVersion;

  if (!version) {

    if (!api.services[service]) {
      throw new Error('Service not found');
    }

    useVersion = api.version;
    soap_wsdl = api.services[service];
  } else {

    useVersion = version;
    soap_wsdl = api.base_api_url + '/' + version + '/' + service + '?wsdl';

  }

  var oathClient = new Oath(api.settings.client_id, api.settings.client_secret, api.settings.redirect_url);
  oathClient.credentials = { refresh_token: api.settings.refresh_token };

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

      var instService = require('./' + useVersion + '/' + service);

      client.addSoapHeader(dfpUser.getSOAPHeader(tokens), 'RequestHeader', 'tns', '');
      callback(new instService(client[service][service + 'InterfacePort']));

    });

  });

};

module.exports = DfpUser;
