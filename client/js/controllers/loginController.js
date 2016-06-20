function loginController($scope, $location, userService, userStore) {
	var self = this;
	self.userData = userStore;

	var _validate = function() {
		return $scope.username
			&& $scope.password;
	};

	$scope.login = function() {
		if (_validate()) {
			userService.login({
				"username": $scope.username,
				"password": sha256_digest($scope.password)
			}).then(function(result) {
				self.userData.setName(result.data.userData.name);
				self.userData.setId(result.data.userData.id);
				$location.path('/home');
			}, function(error) {
				console.log(error);
			});
		} else {
			console.log("Failed");
		}
	};

	$scope.go = function(path) {
		$location.path(path);
	};
};

loginController.$inject = ['$scope', '$location', 'userService', 'userStore'];

angular.module('moneyApp')
.controller('loginController', loginController);