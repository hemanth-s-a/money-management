function mainController($scope, $http) {
	this.abcd = function() {
		return 1;
	};

	$scope.text = "Data binding";
};
mainController.$inject = ['$scope', '$http'];
angular.module('moneyApp')
.controller('mainController', mainController);