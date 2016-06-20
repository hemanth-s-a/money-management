function labelService($http) {
    this.getLabels = (data) => {
        return $http({
            "method": "GET",
            "url": "/label",
            "params": {
                "userId": data.userId,
                "active": data.active
            }
        });
    };

    this.getLabelsForTransaction = (data) => {
        return $http({
            "method": "GET",
            "url": "/labelsForTransaction",
            "params": data
        });
    };

    this.createLabel = (data) => {
        return $http({
            "method": "POST",
            "url": "/label",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": data
        });
    };

    this.addLabel = (data) => {
        return $http({
            "method": "POST",
            "url": "/addLabel",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": data
        });
    };
};

labelService.$inject = ['$http'];

angular.module('moneyApp')
.service('labelService', labelService);
