function userStore($rootScope) {
	return {
		username: '',
		id: '',
		name: '',

		setUsername: function(username) {
			this.username = username;
			$rootScope.$broadcast('login-success');
		},
		getUsername: function() {
			return this.username;
		},

		setId: function(id) {
			this.id = id;
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