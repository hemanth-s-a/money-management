function labelController($scope, $location, labelService, userStore) {
    let self = this;
    self.userData = userStore;

    $scope.getLabels = function() {
        if(!self.userData.getId()) return;
        labelService.getLabels({
            "userId": self.userData.getId(),
            "active": $scope.labelStatus
        }).then((result) => {
            $scope.labelStore = result.data.labels;
        }, function(error) {
            console.log(error);
        });
    };

    $scope.createLabel = () => {
        labelService.createLabel({
            "userId": self.userData.getId(),
            "name": $scope.labelName
        }).then((result) => {
            $location.path('/addSuccess');
        }, (error) => {
            console.log(error);
        });
    };
};

labelController.$inject = ['$scope', '$location', 'labelService', 'userStore'];

angular.module('moneyApp')
.controller('labelController', labelController);

