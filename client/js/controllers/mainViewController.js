function mainViewController($scope, userStore) {
	$scope.isLoggedIn = false;
	$scope.$on('login-success', function() {
		$scope.username = userStore.getUsername();
		$scope.isLoggedIn = true;
	});
};

mainViewController.$inject = ['$scope', 'userStore'];

angular.module('moneyApp')
.controller('mainViewController', mainViewController);