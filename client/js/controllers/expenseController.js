function expenseController($scope, $location, expenseService, userStore) {
	var self = this;
	self.userData = userStore;

	var getExpenseSubTypes = function(parentId) {
		if ($scope.expenseTypes[parentId] && !$scope.expenseTypes[parentId].subTypesFetched) {
			expenseService.getExpenseTypes({
				"parentId": parentId
			}).then(function(result) {
				console.log(result);
				$scope.expenseTypes[parentId].subTypesFetched = true;
				$scope.expenseTypes[parentId].subTypes = result.data.expenseTypes;
				$scope.expenseSubTypes = result.data.expenseTypes;
				$scope.showExpenseSubType = ($scope.expenseTypes[parentId].subTypes.length > 0);
			}, function(error) {
				console.log(error);
			});
		} else if ($scope.expenseTypes[parentId]) {
			$scope.expenseSubTypes = $scope.expenseTypes[parentId].subTypes;
			$scope.showExpenseSubType = ($scope.expenseTypes[parentId].subTypes.length > 0);
		}
	},

	_validate = function() {
		return self.userData.getId() && $scope.amount
			&& ($scope.expenseTypeId || $scope.expenseSubTypeId);
	};

	$scope.initExpenses = function() {
		expenseService.getExpenseTypes({}).then(function(result) {
			console.log(result);
			var lookup = {}, array = result.data.expenseTypes;
			for (var i = 0, len = array.length; i < len; i++) {
				lookup[array[i].id] = array[i];
			}
			$scope.expenseTypes = lookup;
		}, function(error) {
			console.log(error);
		});
	};

	$scope.addExpense = function() {
		if (_validate()) {
			expenseService.addExpense({
				"userId": self.userData.getId(),
				"type": $scope.expenseSubTypeId ? $scope.expenseSubTypeId : $scope.expenseTypeId,
				"amount": $scope.amount,
				"date": $scope.date,
				"description": $scope.description
			}).then(function(result) {
				console.log(result);
				$location.path('/addSuccess');
			}, function(error) {
				console.log(error);
			});
		} else {
			console.log("Not logged in");
		}
	};

	$scope.$watch('expenseTypeId', function(newValue, oldValue) {
		$scope.expenseSubType = null;
		if (!$scope.expenseTypeId) {
			$scope.showExpenseSubType = false;
			return;
		}
		getExpenseSubTypes(newValue);
	});
};

expenseController.$inject = ['$scope', '$location', 'expenseService', 'userStore'];

angular.module('moneyApp')
.controller('expenseController', expenseController);