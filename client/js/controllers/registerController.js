function registerController($scope, $location, userService, userStore) {
	var self = this;
	self.userData = userStore;

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
				"gender": $scope.gender,
				"income": $scope.income
			}).then(function(result) {
				self.userData.setName(result.data.userData.name);
				self.userData.setId(result.data.userData.id);
				console.log(result);
				$location.path('/home');
			}, function(error) {
				console.log(error);
			});
		} else {
			console.log("Failed");
		}
	};
};

registerController.$inject = ['$scope', '$location', 'userService', 'userStore'];

angular.module('moneyApp')
.controller('registerController', registerController);