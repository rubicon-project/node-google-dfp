Date.prototype.ToDfpDate = function (timeZoneID) {
  if (!isNaN(this.valueOf())) {
    return {
      date: {
        year : this.getFullYear(),
        month : this.getMonth(),
        day : this.getDate()
      },
      hour : this.getHours(),
      minute : this.getMinutes(),
      second : this.getSeconds(),
      timeZoneID : timeZoneID
    };
  }

  throw new Error('Empty a date type');
};

Date.prototype.FromDfpDate = function (dfpDate) {
  return new Date(dfpDate.date.year, dfpDate.date.month, dfpDate.date.day, dfpDate.hour, dfpDate.minute, dfpDate.second);
};

module.exports.Statement = function (query) {
  return { filterStatement: { query: query } };
};

module.exports.Money = function (value, currency) {
  return {
    currencyCode: currency,
    microAmount: value * 1000000
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
