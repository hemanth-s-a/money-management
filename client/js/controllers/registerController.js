function registerController($scope, $location, userService) {
	var _validate = function() {
		return $scope.fullname
			&& $scope.email
			&& $scope.username
			&& $scope.password
			&& $scope.password === $scope.repeatPassword;
	};

	$scope.register = function() {
		if (_validate()) {
			console.log("Success");
			userService.register({
				"username": $scope.username,
				"fullname": $scope.fullname,
				"email": $scope.email,
				"password": sha256_digest($scope.password),
				"income": $scope.income
			}).then(function(result) {

			}, function(error) {
				console.log(error);
			});
		} else {
			console.log("Failed");
		}
	};
};

registerController.$inject = ['$scope', '$location', 'userService'];

angular.module('moneyApp')
.controller('registerController', registerController);