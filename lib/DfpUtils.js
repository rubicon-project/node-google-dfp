module.exports.DfpDate = {
  to    : function (dfpDate) {
    return new Date(dfpDate.date.year, dfpDate.date.month, dfpDate.date.day, dfpDate.hour, dfpDate.minute, dfpDate.second);
  },
  from  : function (today, timeZoneID, days, months) {
    return {
      date  : {
        year  : today.getFullYear(),
        month : today.getMonth() + 1 + (months === undefined ? 0 : months),
        day   : today.getDate() + (days === undefined ? 0 : days)
      },
      hour        : today.getHours(),
      minute      : today.getMinutes(),
      second      : today.getSeconds(),
      timeZoneID  : timeZoneID
    };
  }
};

module.exports.Statement = function (query) {
  return { filterStatement: { query: query } };
};

module.exports.Money = function (value, currency) {
  return {
    currencyCode: currency,
    microAmount: Math.round(value * 1000000)
  };
};

module.exports.assetByteArray = function (filename) {
  var fs = require('fs'),
    bitmap;

  if (!filename) {
    return '';
  }

  bitmap = fs.readFileSync(filename);
  return new Buffer(bitmap).toString('base64');
};
