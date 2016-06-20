function expenseController($scope, $location, expenseService, userStore, labelService) {
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

		if (!self.userData.getId()) return;
		labelService.getLabels({
			"userId": self.userData.getId(),
			"active": 1
		}).then((result) => {
			$scope.activeLabels = result.data.labels;
		}, (error) => {
			console.log(error);
		});
	};

	$scope.addExpense = function() {
		if (_validate()) {
			expenseService.addExpense({
				"userId": self.userData.getId(),
				"expenseType": $scope.expenseSubTypeId ? $scope.expenseSubTypeId : $scope.expenseTypeId,
				"amount": $scope.amount,
				"creditDebit": 1,
				"date": $scope.date,
				"description": $scope.description,
				"labels": $scope.selectedLabels
			}).then(function(result) {
				console.log(result);
				if (result.status == 3) {
					alert(result.message);
				}
				$location.path('/addSuccess');
			}, function(error) {
				console.log(error);
			});
		} else {
			console.log("Not logged in");
		}
	};

	$scope.getExpenses = function() {
		if(!self.userData.getId()) return;
		expenseService.getExpenses({
			"userId": self.userData.getId()
		}).then(function(result) {
			console.log(result);
			$scope.expenseStore = result.data.expenses;
		}, function(error) {
			console.log(error);
		});
	};

	$scope.getLabels = (expense, event) => {
		labelService.getLabelsForTransaction({
			"transactionId": expense.id
		}).then((result) => {
			expense.appliedLabels = result.data.labels;
			expense.labels = $scope.activeLabels.filter((label) => {
				for (let i = 0, len = expense.appliedLabels.length; i < len; i++) {
					if (expense.appliedLabels[i].id == label.id) return false;
				}
				return true;
			});
			if (event) {
				expense.showLabels = true;
			}
		}, (error) => {
			console.log(error);
		});
	};

	$scope.getFilterOptions = () => {
		if(!self.userData.getId()) return;
		labelService.getLabels({
			"userId": self.userData.getId()
		}).then((result) => {
			$scope.activeLabels = result.data.labels;
		}, (error) => {
			console.log(error);
		});
	};

	$scope.addLabels = (expense) => {
		labelService.addLabel({
			"transactionId": expense.id,
			"labels": expense.selectedLabels
		}).then((result) => {
			expense.showLabels = false;
			expense.selectedLabels = [];
			$scope.getLabels(expense);
		}, (error) => {
			console.log(error);
		});
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

expenseController.$inject = ['$scope', '$location', 'expenseService', 'userStore', 'labelService'];

angular.module('moneyApp')
.controller('expenseController', expenseController);
