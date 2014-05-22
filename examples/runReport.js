// run a report on line item #1234567

var Dfp = require('../lib/Dfp');
var dfpConfig = require('/dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCore, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);

dfpUser.getService('ReportService', function (reportService) {

  var reportJob = {
    dimensions : [ 'DATE' ],
    columns : [ 'AD_SERVER_CLICKS', 'AD_SERVER_IMPRESSIONS' ],
    dimensionAttributes : [],
    startDate : new Date('2014-05-01').ToDfpDate(),
    endDate : new Date('2014-05-21').ToDfpDate(),
    dimensionFilters : [],
    statement : new Dfp.Statement('WHERE LINE_ITEM_ID = 1234567'),
    timeZone : 'America/New_York'
  };

  reportService.runReportJob(reportJob, function (err, results) {
    if (err)
      return console.log('ERROR', err);
    console.log('results', results);
  });
});
