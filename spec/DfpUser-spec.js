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
    });
  });
});