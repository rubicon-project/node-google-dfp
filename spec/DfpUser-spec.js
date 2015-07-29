var DfpUser = require('../lib/DfpUser');

describe("DfpUser", function () {
  describe(".__construct", function () {
    it("should setup DFP connection", function () {
      var dfpSetup = DfpUser('12345', 'myAwesomwApp', 'v201405');

      expect(dfpSetup.networkCode).toBe('12345');
      expect(dfpSetup.applicationName).toBe('myAwesomwApp');
      expect(dfpSetup.version).toBe('v201405');
    });
  });
});