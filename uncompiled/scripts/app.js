/*
 * Plivo interview task.
 * Outbound call rate comparison.
 * Tomi Hiltunen 2013.
 */

/* IMPORTS
 *
 * AngularJS Framework & jQuery
 * @codekit-prepend "lib/jquery/jquery-1.10.2.js"
 * @codekit-prepend "lib/jquery/jquery.csv-0.71.js"
 * @codekit-prepend "lib/angular-1-1-5/angular.js"
 *
 * Presets
 * @codekit-prepend "presets.js"
 *
 * Services
 * @codekit-append "services/Rates.js"
 *
 * Controllers
 * @codekit-append "controllers/PriceComparisonCtrl.js"
 */


///////////////////////////////////////////////
// APP BASICS
///////////////////////////////////////////////

var App = angular.module('Plivo', ['Plivo.controllers', 'Plivo.directives', 'Plivo.filters', 'Plivo.services']);

/*
 * Configure the app and run it.
 */

App.run(['Rates', function(Rates){

	/* Load and parse the files for call rates.
	 * 
	 * Data structure:
	 *
	 * var data = {
	 *     "358": 0.064,
	 *     "44": 0.047,
	 *     ...
	 * }
	 */

	///////////////////////////////////////////////
	// PLIVO
	///////////////////////////////////////////////

	Rates.parseCSV("plivo", "./rates/plivo.csv", function(data) {
		var rateData = {};
		// Loop through the lines
		for (var i=1; i<data.length; i++) {
			rateData[''+data[i][3]] = parseFloat(data[i][4]) * (parseInt(data[i][5])/60);
		}
		return rateData;
	});

	///////////////////////////////////////////////
	// TWILIO
	///////////////////////////////////////////////

	Rates.parseCSV("twilio", "./rates/twilio.csv", function(data) {
		var rateData = {};
		var tempPrefixes = [];
		var tempRate = 0;
		// Loop through the lines
		for (var i=1; i<data.length; i++) {
			tempPrefixes = data[i][2].replace(" ", "").split(",");
			tempRate = parseFloat(data[i][1]);
			for (var j=0; j<tempPrefixes.length; j++) {
				rateData[''+tempPrefixes[j]] = tempRate;
			}
		}
		return rateData;
	});

	///////////////////////////////////////////////
	// TROPO
	///////////////////////////////////////////////

	Rates.parseCSV("tropo", "./rates/tropo.csv", function(data) {
		var rateData = {};
		// Loop through the lines
		for (var i=1; i<data.length; i++) {
			rateData[''+data[i][2]] = parseFloat(data[i][3]);
		}
		return rateData;
	});

}]);