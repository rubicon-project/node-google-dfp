var
  DEFAULT_VERSION = 'v201403',
  BASE_API_URL = 'https://www.google.com/apis/ads/publisher';


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


DfpUser.prototype.getSOAPHeader = function (token) {

  return {
    RequestHeader : {
      attributes: {
        'soapenv:actor':            "http://schemas.xmlsoap.org/soap/actor/next",
        'soapenv:mustUnderstand':   0,
        'xsi:type':                 "ns1:SoapRequestHeader",
        'xmlns:ns1':                "https://www.google.com/apis/ads/publisher/" + this.version,
        'xmlns:xsi':                "http://www.w3.org/2001/XMLSchema-instance",
        'xmlns:soapenv':            "http://schemas.xmlsoap.org/soap/envelope/"
      },
      networkCode: this.networkCode,
      applicationName: this.applicationName,
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

    soap.createClient(soap_wsdl, function (err, client) {
      if (err) {
        console.log('Create Client Error ' + err);
        throw new Error('Unable to get token');
      }

      client.addSoapHeader(dfpUser.getSOAPHeader(tokens), 'RequestHeader', 'tns', '');

      var serviceInstance = {};

      var interfacePort = client[service][service + 'InterfacePort'];
      for(var method in interfacePort){
        var object = interfacePort[method];
        if (object && typeof(object) == "function") {
          serviceInstance[method] = (function(method) {
              return function() {

                // have the callback only get the results
                var cb = null;
                for(var args in arguments) {
                  if (typeof(arguments[args]) == "function") {
                    cb = arguments[args];
                    arguments[args] = function (err, results) {
                      return cb(err, results);
                    };
                    break;
                  }
                }

                client[method](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
              }
          })(method);
        }
      }

      return callback(serviceInstance);
    });

  });

  return this;
};


module.exports = DfpUser;
