angular.module('moneyApp', ['ngRoute'])
.config([
'$routeProvider',
function($routeProvider) {
	$routeProvider
		// .when('/', {
		// 	templateUrl: 'views/main.html',
		// 	controller: 'mainController'
		// })

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'registerController'
		})

		.when('/addExpense', {
			templateUrl: 'views/addExpense.html',
			controller: 'expenseController'
		})

		.when('/getExpense', {
			templateUrl: 'views/getExpenses.html',
			controller: 'expenseController'
		})

		.when('/home', {
			templateUrl: 'views/home.html'
		})

		.when('/addSuccess', {
			templateUrl: 'views/addSuccess.html'
		})

		.otherwise({redirectTo: '/login'});
}]);