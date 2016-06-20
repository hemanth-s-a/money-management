function expenseService($http) {
	this.getExpenseTypes = function(data) {
		return $http({
			"method": "GET",
			"url": "/expenseTypes",
			"params": {
				"parentId": data.parentId
			}
		});
	};

	this.addExpense = function(data) {
		return $http({
			"method": "POST",
			"url": "/expense",
			"headers": {
				"Content-Type": "application/json"
			},
			"data": data
		});
	};

	this.getExpenses = function(data) {
		return $http({
			"method": "GET",
			"url": "/expense",
			"params": {
				"userId": data.userId
			}
		});
	};
};

expenseService.$inject = ['$http'];

angular.module('moneyApp')
.service('expenseService', expenseService);