'use strict';

var myApp = angular.module('myApp', []);

function mainController($scope, $http) {

    $scope.updateView = () => {
        $http.get('/employees').success(function (response) {
            $scope.employees = response;
            $scope.employee = "";
            $scope.update = false;
        });
    }

    $scope.updateView();

    $scope.addEmployee = () => {
        $http.post('/employee', $scope.employee).success(function (response) {
            $scope.updateView();
        });
    };

    $scope.removeEmployee = function (id) {
        $http.delete('/employee/' + id).success(function (response) {
            $scope.updateView();
        });
    };

    $scope.editEmployee = function (id) {
        console.log(id);
        $http.get('/employee/' + id).success(function (response) {
            $scope.employee = response.employee;
            $scope.update = true;
        });
    };

};