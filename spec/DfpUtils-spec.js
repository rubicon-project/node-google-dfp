var DfpUtils = require('../lib/DfpUtils');

describe("DfpUtils", function () {
  describe(".DfpDate.from", function () {
    it("should convert JS Date to DFP", function () {
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
  describe(".DfpDate.to", function () {
    it("should convert DFP Date to JS", function () {
      var curr_date = new Date(),
        dfp_date    = { date : {
          year  : curr_date.getFullYear(),
          month : curr_date.getMonth(),
          day   : curr_date.getDate()
        },
          hour       : curr_date.getHours(),
          minute     : curr_date.getMinutes(),
          second     : curr_date.getSeconds(),
          timeZoneID : 'America/Toronto'
          },
      js_date         = DfpUtils.DfpDate.to(dfp_date);

      expect(js_date.getFullYear()).toBe(curr_date.getFullYear());
      expect(js_date.getMonth()).toBe(curr_date.getMonth());
      expect(js_date.getDate()).toBe(curr_date.getDate());

      expect(js_date.getHours()).toBe(curr_date.getHours());
      expect(js_date.getMinutes()).toBe(curr_date.getMinutes());
      expect(js_date.getSeconds()).toBe(curr_date.getSeconds());
    });
  });
  describe(".Statement", function () {
    it("should convert query to DFP Statement", function () {
      var dfp_statement = new DfpUtils.Statement('WHERE id > 10 LIMIT 10'),
        expected_query  = {
          filterStatement : {
            query : 'WHERE id > 10 LIMIT 10'
          }
        };
      expect(dfp_statement.filterStatement.query).toBe(expected_query.filterStatement.query);
    });
  });
  describe(".Money", function () {
    it("should convert money to DFP micro amounts", function () {
      var dfp_statement = new DfpUtils.Money(5.7, 'CAD'),
        expected_query  = {
          currencyCode  : 'CAD',
          microAmount   : 5700000
        };
      expect(dfp_statement.currencyCode).toBe(expected_query.currencyCode);
      expect(dfp_statement.microAmount).toBe(expected_query.microAmount);
    });
  });
  describe(".Money", function () {
    it("should convert money to DFP micro amounts without rounding issues", function () {
      var dfp_statement = new DfpUtils.Money(418/100, 'CAD'),
        expected_query  = {
          currencyCode  : 'CAD',
          microAmount   : 4180000
        };
      expect(dfp_statement.currencyCode).toBe(expected_query.currencyCode);
      expect(dfp_statement.microAmount).toBe(expected_query.microAmount);
    });
  });
  describe(".assetByteArray", function () {
    it("should convert image to assetByteArray", function () {
      var dfp_image_1   = DfpUtils.assetByteArray('./spec/FF4D00-0.8.png'),
        expected_image  = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/TQBcNTh/AAAAAXRSTlPM0jRW/QAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII=",
        dfp_image_2     = DfpUtils.assetByteArray(''),
        expect_image_2  = "";

      expect(dfp_image_1).toBe(expected_image);
      expect(dfp_image_2).toBe(expect_image_2);
    });
  });
});