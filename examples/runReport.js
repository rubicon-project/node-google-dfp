// run a report on line item #1234567

var Dfp = require('node-google-dfp');
var dfpConfig = require('./dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCore, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);

dfpUser.getService('ReportService', function (reportService) {

  var intervalId = null;
  var results = null;
  var args = {
    reportJob: {
      reportQuery: {
        dimensions: ['DATE'],
        columns: [ 'AD_SERVER_CLICKS', 'AD_SERVER_IMPRESSIONS' ],
        dimensionAttributes : [],
        startDate: { year: 2014, month: 5, day: 22 },
        endDate: { year: 2014, month: 6, day: 21 },
        dimensionFilters : [],
        statement: { query : 'WHERE LINE_ITEM_ID = 123456789'}
      }
    }
  };

  function check_report_ready () {

    var reportId = results.rval.id;
    console.log('Trying to get report #' + reportId);

    reportService.getReportJob({reportJobId : reportId}, function (err, data) {

      if (err) {
        return console.log('ERROR', err);
      }
      console.log('Report Job #' + reportId + ' returned ' + data.rval.reportJobStatus);

      if (data.rval.reportJobStatus === 'COMPLETED') {

        var download_args = {
          reportJobId           : reportId,
          reportDownloadOptions : {
            exportFormat            : 'CSV_EXCEL',
            includeReportProperties : false,
            includeTotalsRow        : false,
            useGzipCompression      : true
          }
        };

        reportService.getReportDownloadUrlWithOptions(download_args, function (err, data) {
          if (err) {
            return console.log('ERROR', err.body);
          }

          console.log("Downloading report from " + data.rval);
          download_report(data.rval, 'downloaded_report.csv');
        });
      }

      if (data.rval.reportJobStatus === 'FAILED') {
        console.log('Report Failed!');
      }

      if (data.rval.reportJobStatus === 'IN_PROGRESS') {
        setTimeout(check_report_ready, 100);
      }

    });
  };

  function download_report (download_url, local_filename) {
    var https = require('https');
    var fs = require('fs');
    var zlib = require('zlib');

    var file = fs.createWriteStream(local_filename);
    var request = https.get(download_url, function(response) {
      response.pipe(zlib.createGunzip()).pipe(file);
    });
  };

  reportService.runReportJob(args, function (err, jobStatus) {
    if (err) {
      return console.log('ERROR', err.body);
    }

    results = jobStatus;
    setTimeout(check_report_ready, 100);

  });

});
