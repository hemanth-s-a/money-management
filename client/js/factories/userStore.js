function userStore($rootScope) {
	return {
		username: '',

		setUsername: function(username) {
			this.username = username;
			$rootScope.$broadcast('login-success');
		},

		getUsername: function() {
			return this.username;
		}
	};
};

userStore.$inject = ['$rootScope'];

angular.module('moneyApp')
.factory('userStore', userStore);