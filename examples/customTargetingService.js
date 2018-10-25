var Dfp = require('node-google-dfp');
var dfpConfig = require('./dfpCredentials');

var dfpUser = new Dfp.User(dfpConfig.networkCode, dfpConfig.applicationName);
dfpUser.setSettings(dfpConfig);


//Documentation : https://developers.google.com/ad-manager/api/reference/v201802/CustomTargetingService


dfpUser.getService('CustomTargetingService', (err, targetingService) => {
	if (err) throw err;

	//get customTargetingKeys
	getCustomTargetingKeys(targetingService, (err, result) => {
		if (err) throw err;
		console.log(result);
    //expected result:

    // {
    //   "rval": {
    //     "totalResultSetSize": 1,
    //     "startIndex": 0,
    //     "results": [
    //       {
    //         "id": "123456789",
    //         "name": "AB",
    //         "displayName": "ABE",
    //         "type": "FREEFORM",
    //         "status": "ACTIVE"
    //       }
    //     ]
    //   }
    // }
	});


	//update customTargetingKeys
	updateCustomTargetingKeys(targetingService, (err, result) => {
		if (err) throw err;
		console.log(result);
    //expected result:

    // {
    //   "rval": [
    //     {
    //       "id": "123456789",
    //       "name": "ABCD",
    //       "displayName": "ABCDE",
    //       "type": "FREEFORM",
    //       "status": "ACTIVE"
    //     }
    //   ]
    // }
	})


	//get customTargetingValues
	getCustomTargetingValues(targetingService, (err, result) => {
		if (err) throw err;
		console.log(result);

    //expected result:

    // {
    //   "rval": {
    //     "totalResultSetSize": 1,
    //     "startIndex": 0,
    //     "results": [
    //       {
    //         "customTargetingKeyId":"123456789",
    //         "id": "1234567897384",
    //         "name": "DCE",
    //         "displayName": "DC",
    //         "matchType":"EXACT",
    //         "status": "ACTIVE"
    //       }
    //     ]
    //   }
    // }

	})

	//updateCustomTargetingValues
	updateCustomTargetingValues(targetingService, (err, result) => {
		if (err) throw err;
		console.log(result);
    //expected result:

    // {
    //   "rval": [
    //     {
    //       "customTargetingKeyId":"123456789",
    //       "id": "1234567897384",
    //       "name": "DCERZ",
    //       "displayName": "DCERZT",
    //       "matchType":"EXACT",
    //       "status": "ACTIVE"
    //     }
    //   ]
    // }
	})

});


let getCustomTargetingKeys = (targetingService, done) => {
	let query = new Dfp.Statement("WHERE status='ACTIVE'");//put your query statement
	targetingService.getCustomTargetingKeysByStatement(query, (err, results) => {
		if (err) throw err;
		done(null, results);
	})
}


let getCustomTargetingValues = (targetingService, done) => {
  let key = '123456789' //customTargetingKeyId
	let query = new Dfp.Statement(`WHERE customTargetingKeyId='11704510'`); //put your query statement
	targetingService.getCustomTargetingValuesByStatement(query, (err, results) => {
		if (err) throw err;
		done(null, results)
	})
}


let updateCustomTargetingKeys = (targetingService, done) => {
	var args = { keys: [{
		"id":"123456789",
		"name":"ABCD",
		"displayName":"ABCDE",
		"type":"FREEFORM",
		"status":"ACTIVE"}
	]};
	targetingService.updateCustomTargetingKeys(args, (err, results) => {
		if (err) throw err;
		done(null, results);
	})
}


let updateCustomTargetingValues = (targetingService, done) => {
	var args = { values: [{
		"customTargetingKeyId":"11704510",
		"id":"1234567897384",
		"name":"DCERZ",
		"displayName":"DCERZT",
		"matchType":"EXACT",
		"status":"ACTIVE"}
	]};
	targetingService.updateCustomTargetingValues(args, (err, results) => {
		if (err) throw err;
		done(null, results);
	})
}
