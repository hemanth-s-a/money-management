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
				"gender": data.gender,
				"income": data.income
			}
		});
	};
};

userService.$inject = ['$http'];

angular.module('moneyApp')
.service('userService', userService);