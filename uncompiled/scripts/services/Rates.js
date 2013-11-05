/*
 * Manages the rate data.
 */
angular.module('Plivo.services').factory('Rates', ['$http', function ($http) {
	
	// The rate data
	var rateData = {};
	var providers = [];

	return {

		/* Load the CSV file and parse it with the custom fitted parsing function.
		 */
		parseCSV: function(name, csvUrl, customParser) {
			// Load the CSV file.
			return $http({method: 'GET', url: csvUrl}).
				success(function(data, status, headers, config) {
					// Parse CSV to two-dimensional arrays
					data = $.csv.toArrays(data);
					// run the custom parser function
					data = customParser.call(this, data);
					// Set the reformatted data in the service
					rateData[name] = data;
					// Push service provider name to provider list
					providers.push(name);
				});
		},

		/* Get outbound call rate for a provider and a certain prefix.
		 */
		getRate: function(provider, prefix) {
			try {
				return rateData[provider][prefix];
			} catch(e) {
				return null;
			}
		},

		/* Get lowest outbound call rate among all providers and a certain prefix.
		 */
		getLowestRate: function(prefix) {
			try {
				var lowestSoFar = Infinity;
				for (var i=0; i<providers.length; i++) {
					try {
						if (rateData[providers[i]][prefix] < lowestSoFar) {
							lowestSoFar = rateData[providers[i]][prefix];
						}
					} catch(e) {}
				}
				return lowestSoFar;
			} catch(e) {
				return null;
			}
		}

	};

}]);