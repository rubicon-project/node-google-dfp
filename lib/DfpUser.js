var
  DEFAULT_VERSION = 'v201405',
  BASE_API_URL = 'https://ads.google.com/apis/ads/publisher';


var DfpUser = function (netCode, appName, version) {

  this.networkCode = netCode;
  this.applicationName = appName;
  this.version = version || DEFAULT_VERSION;

  return this;
};


DfpUser.prototype.setSettings = function (settings) {
  this.settings = settings;
  return this;
};


DfpUser.prototype.getSOAPHeader = function () {

  return {
    RequestHeader: {
      attributes: {
        'soapenv:actor':            "http://schemas.xmlsoap.org/soap/actor/next",
        'soapenv:mustUnderstand':   0,
        'xsi:type':                 "ns1:SoapRequestHeader",
        'xmlns:ns1':                "https://www.google.com/apis/ads/publisher/" + this.version,
        'xmlns:xsi':                "http://www.w3.org/2001/XMLSchema-instance",
        'xmlns:soapenv':            "http://schemas.xmlsoap.org/soap/envelope/"
      },
      'ns1:networkCode'     : this.networkCode,
      'ns1:applicationName' : this.applicationName
    }
  };

};


DfpUser.prototype.getService = function (service, callback, version) {

  var soap = require('soap');
  var Oath = require('googleapis').auth.OAuth2;
  var soap_wsdl;
  var dfpUser = this;

  version = version || this.version;

  soap_wsdl = BASE_API_URL + '/' + version + '/' + service + '?wsdl';

  var oathClient = new Oath(this.settings.client_id, this.settings.client_secret, this.settings.redirect_url);
  oathClient.credentials = { refresh_token: this.settings.refresh_token };

  oathClient.refreshAccessToken(function (err, tokens) {

    if (err) {
      console.log('Refresh Token Error ' + err);
      throw new Error('Unable to get token');
    }

    var options = {
     ignoredNamespaces: {
       namespaces: ['tns']
     }
    };

    soap.createClient(soap_wsdl, options, function (err, client) {
      if (err) {
        console.log('Create Client Error ' + err);
        throw new Error('Unable to get token');
      }

      client.addSoapHeader(dfpUser.getSOAPHeader(), '', 'ns1', '');

      var serviceInstance = {};
      var interfacePort = client[service][service + 'InterfacePort'];
      var method, object;

      for (method in interfacePort) {
        if (interfacePort.hasOwnProperty(method)) {
          object = interfacePort[method];
          if (object && typeof object === "function") {
            serviceInstance[method] = (function (method) {
              return function () {
                var authhdr = { 'Authorization' : tokens.token_type + ' ' + tokens.access_token };
                client[method](arguments[0], arguments[1], arguments[2], authhdr, arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
              };
            })(method);
          }
        }
      }

      return callback(serviceInstance);
    });

  });

  return this;
};


module.exports = DfpUser;
