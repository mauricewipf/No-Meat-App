'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ProfileCtrl', ['$scope', 'AuthFactory', function($scope, AuthFactory) {

    $scope.username = '';

    if (AuthFactory.isAuthenticated()) {
        $scope.username = AuthFactory.getUsername();
    }

    /*TODO

    $scope.updatePassword = function () {};
    $scope.deleteAccount = function () {};

    */

  }]);
