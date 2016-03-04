angular.module('skeletonApp')
.controller('mainController', [
'$scope',
'$http',
function ($scope, $http) {
	$scope.text = "Data binding";
}]);