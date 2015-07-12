var DfpUtils = require('../lib/DfpUtils');

describe("DfpUtils", function () {
  describe(".DfpDate", function () {
    it("should convert now to DFP date now", function () {
      var curr_date = new Date(),
        dfp_date    = DfpUtils.DfpDate.from(new Date(), 'America/Toronto'),
        result      = { date : {
          year  : curr_date.getFullYear(),
          month : curr_date.getMonth() + 1,
          day   : curr_date.getDate()
        },
        hour       : curr_date.getHours(),
        minute     : curr_date.getMinutes(),
        second     : dfp_date.second,
        timeZoneID : dfp_date.timeZoneID
      };

      expect(dfp_date.date.year).toBe(result.date.year);
      expect(dfp_date.date.month).toBe(result.date.month);
      expect(dfp_date.date.day).toBe(result.date.day);

      expect(dfp_date.hour).toBe(result.hour);
      expect(dfp_date.minute).toBe(result.minute);
    });
  });
  describe("DfpStatement", function () {

  });
});