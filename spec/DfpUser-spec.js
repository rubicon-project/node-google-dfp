var DfpUser = require('../lib/DfpUser');

describe("DfpUser", function () {
  describe(".__construct", function () {
    it("should setup DFP connection", function () {
      var dfpSetup = new DfpUser('12345', 'myAwesomwApp', 'v201405');

      expect(dfpSetup.networkCode).toBe('12345');
      expect(dfpSetup.applicationName).toBe('myAwesomwApp');
      expect(dfpSetup.version).toBe('v201405');

      dfpSetup.setClient('Authorized Client');
      expect(dfpSetup.authClient).toBe('Authorized Client');

      var settingsStuct = {
        client_id     : 'client_id',
        client_secret : 'client_secret',
        redirect_url  : 'redirect_url',
        refresh_token : 'refresh_token'
      };

      dfpSetup.setSettings(settingsStuct);
      expect(settingsStuct.client_id).toBe('client_id');
      expect(settingsStuct.client_secret).toBe('client_secret');
      expect(settingsStuct.redirect_url).toBe('redirect_url');
      expect(settingsStuct.refresh_token).toBe('refresh_token');

      var header = dfpSetup.getSOAPHeader();
      expect(header.RequestHeader.attributes['soapenv:actor']).toBe('http://schemas.xmlsoap.org/soap/actor/next');
      expect(header.RequestHeader.attributes['soapenv:mustUnderstand']).toBe(0);
      expect(header.RequestHeader.attributes['xsi:type']).toBe('ns1:SoapRequestHeader');
      expect(header.RequestHeader.attributes['xmlns:ns1']).toBe('https://www.google.com/apis/ads/publisher/' + dfpSetup.version);
      expect(header.RequestHeader.attributes['xmlns:xsi']).toBe('http://www.w3.org/2001/XMLSchema-instance');
      expect(header.RequestHeader.attributes['xmlns:soapenv']).toBe('http://schemas.xmlsoap.org/soap/envelope/');
      expect(header.RequestHeader['ns1:networkCode']).toBe(dfpSetup.networkCode);
      expect(header.RequestHeader['ns1:applicationName']).toBe(dfpSetup.applicationName);
    });
  });
});