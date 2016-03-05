angular.module('moneyApp', ['ngRoute'])
.config([
'$routeProvider',
function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'registerController'
		})

		.otherwise({redirectTo: '/'});
}]);