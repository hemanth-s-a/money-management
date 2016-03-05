function userService($http) {
	this.register = function(data) {
		return $http({
			"method": "POST",
			"url": "/register",
			"headers": {
				"Content-Type": "application/json"
			},
			"data": {
				"username": data.username,
				"name": data.fullname,
				"email": data.email,
				"password": data.password,
				"gender": data.gender,
				"income": data.income
			}
		});
	};

	this.login = function(data) {
		return $http({
			"method": "POST",
			"url": "/login",
			"headers": {
				"Content-Type": "application/json"
			},
			"data": {
				"username": data.username,
				"password": data.password
			}
		});
	};
};

userService.$inject = ['$http'];

angular.module('moneyApp')
.service('userService', userService);