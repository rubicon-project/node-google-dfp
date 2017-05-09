var DEFAULT_VERSION = 'v201702',
  BASE_API_URL    = 'https://ads.google.com/apis/ads/publisher',
  google          = require('googleapis'),
  packageVersion  = require('../package.json').version;

function DfpUser(netCode, appName, version) {
  this.networkCode = netCode;
  this.applicationName = appName;
  this.version = version || DEFAULT_VERSION;
  this.userAgent = "(DfpApi-Nodejs, ShinyAds/" + packageVersion + ", node/" + process.versions.node + ")";

  return this;
}

DfpUser.prototype.setClient = function (client) {
  this.authClient = client;
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
        'soapenv:actor'           : "http://schemas.xmlsoap.org/soap/actor/next",
        'soapenv:mustUnderstand'  : 0,
        'xsi:type'                : "ns1:SoapRequestHeader",
        'xmlns:ns1'               : "https://www.google.com/apis/ads/publisher/" + this.version,
        'xmlns:xsi'               : "http://www.w3.org/2001/XMLSchema-instance",
        'xmlns:soapenv'           : "http://schemas.xmlsoap.org/soap/envelope/"
      },
      'ns1:networkCode'     : this.networkCode,
      'ns1:applicationName' : this.applicationName + " " + this.userAgent
    }
  };
};

DfpUser.prototype.getService = function (service, callback, version) {
  var soap = require('soap');
  var soap_wsdl;
  var dfpUser = this;

  version = version || this.version;

  soap_wsdl = BASE_API_URL + '/' + version + '/' + service + '?wsdl';

  var options = {
    ignoredNamespaces: {
      namespaces: ['tns']
    }
  };

  // If the callback accepts two arguments, make note that we should pass errors
  // to the callback.
  //
  var callbackSupportsError = callback.length === 2;

  this.getTokens(function (err, tokens) {

    if (err) {
      console.log('getTokens Error ' + err);
      var error = new Error('getTokens Error');
      if (callbackSupportsError) {
        return callback(error);
      }
      throw error;
    }

    soap.createClient(soap_wsdl, options, function (err, client) {
      if (err) {
        console.log('Create Client Error ' + err);
        var error = new Error('Unable to get token');
        if (callbackSupportsError) {
          return callback(error);
        }
        throw error;
      }

      client.addSoapHeader(dfpUser.getSOAPHeader(), '', '', '');

      var serviceInstance = {},
        interfacePort     = client[service][service + 'InterfacePort'],
        invokeMethod      = function (method) {
          return function () {
            var authhdr = { 'Authorization' : tokens.token_type + ' ' + tokens.access_token };
            client[method](arguments[0], arguments[1], arguments[2], authhdr, arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
          };
        },
        method,
        object;

      for (method in interfacePort) {
        if (interfacePort.hasOwnProperty(method)) {
          object = interfacePort[method];
          if (object && typeof object === "function") {
            serviceInstance[method] = invokeMethod(method);
          }
        }
      }

      if (callbackSupportsError) {
        return callback(null, serviceInstance);
      }
      callback(serviceInstance);
    });
  });

  return this;
};

DfpUser.prototype.getTokens = function (callback) {
  if (this.authClient) {
    return this.authClient.authorize(callback);
  }

  var oauthClient = new google.auth.OAuth2(this.settings.client_id, this.settings.client_secret, this.settings.redirect_url);
  oauthClient.setCredentials({ refresh_token: this.settings.refresh_token });
  oauthClient.refreshAccessToken(callback);
};

module.exports = DfpUser;
