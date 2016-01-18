var angApp = angular.module('myApp', []);
angApp.controller('userListCon', function($scope,usernames) {
    $scope.userList = usernames;
    // $scope.lastName = "Doe";
});
