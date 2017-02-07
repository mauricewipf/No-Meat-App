'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
.controller('LoginCtrl', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.loginData = $localStorage.getObject('userinfo', '{}');

    $scope.doLogin = function() {
        if ($scope.rememberMe) {
          $localStorage.storeObject('userinfo', $scope.loginData);
        }

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };

    $scope.openRegister = function() {
        ngDialog.open({
            template: 'views/register.html',
            scope: $scope,
            className: 'ngdialog-theme-default',
            controller: 'RegisterCtrl'
        });
    };

}]);
