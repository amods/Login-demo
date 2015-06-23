angular.module('loginDemo', [])
.controller('baseController', function ($scope, $timeout, loginService) {
    $scope.loginSuccess = false;
    $scope.loginFailure = false;
    $scope.valid = false;
    $scope.user = { username: '', password: '' };
    $scope.logIn = function () {
        $scope.valid = $scope.validate($scope.user.username);
        if (!$scope.valid) { alert("Invalid email"); return; };
        if ($scope.user.username !== '' && $scope.user.password !== '' && $scope.valid)
           loginService.login($scope.user, $scope.callback);
    }
    $scope.validate = function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    $scope.callback = function (result) {
        if (result.data.resultCode === "SUCCESS") $scope.loginSuccess = true;
        else if (result.data.resultCode === "FAILURE") $scope.loginFailure = true;
        $timeout(function () { $scope.loginSuccess = false; $scope.loginFailure = false; }, 5000);
    }
})
.factory("loginService", function ($http, $q) {
    var service = {};
    service.login = function (userData, callback) {       
        $http.post("https://example.com", userData)
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback("Request failed");
            });
    }
    return service;
});