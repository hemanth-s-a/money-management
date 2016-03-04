angular.module('skeletonApp', ['ngRoute'])
.config([
'$routeProvider',
function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController'
		})

		.otherwise({redirectTo: '/'});
}]);