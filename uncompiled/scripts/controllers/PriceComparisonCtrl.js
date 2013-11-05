/*
 * Controller for price comparison
 */
angular.module('Plivo.controllers').controller('PriceComparisonCtrl', ['$scope', 'Rates',
	function ($scope, Rates) {

		// Base the prefix
		$scope.prefix = "1";
		// The raw input prefix
		$scope.rawPrefix = "";

		$scope.$watch("rawPrefix", function() {
			$scope.prefix = $scope.rawPrefix.replace(/[^0-9]/g, "");
		});

		// Has prefix
		$scope.getRateForPrefix = function (prefix, provider) {
			return Rates.getRate(provider, prefix);
		};

		// Check if the current is lowest
		$scope.isLowest = function (prefix, provider) {
			return (Rates.getLowestRate(prefix) >= Rates.getRate(provider, prefix)) ? true : false;
		};

}]);