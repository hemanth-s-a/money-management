function userStore($rootScope) {
	return {
		username: '',
		id: '',
		name: '',

		setUsername: function(username) {
			this.username = username;
		},
		getUsername: function() {
			return this.username;
		},

		setId: function(id) {
			this.id = id;
			$rootScope.$broadcast('login-success');
		},
		getId: function() {
			return this.id;
		},

		setName: function(name) {
			this.name = name;
		},
		getName: function() {
			return this.name;
		}
	};
};

userStore.$inject = ['$rootScope'];

angular.module('moneyApp')
.factory('userStore', userStore);