'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', 'calendarFactory', function ($scope, calendarFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // var date = new Date();
    // var d = date.getDate();
    // var m = date.getMonth();
    // var y = date.getFullYear();
    // $scope.days = [
    //   {id:1000, title: 'NoMeatEaten',start: '2017-02-22', allDay:true},
    //   {id:1001, title: 'All Day Event',start: new Date(y, m, 1)},
    //   {id:1002, title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    //   {id:1003, title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false}
    // ];

    $scope.days = calendarFactory.query()
        .$promise.then(
        function(response) {
            $scope.days = JSON.parse(angular.toJson(response));
            console.log($scope.days);
        },
        function(response) {
            console.log('Error: ', response);
            $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
        }
    );

    // $scope.eventSources = [$scope.days];

    /* add day*/
    $scope.addDay = function(date) {
      $scope.days.push({
        title: 'NoMeatEaten',
        start: date._d,
        allDay:true
      });
      // console.log(date._d + ' added');
      console.log($scope.days);
    };

    /* remove day */
    $scope.removeDay = function(index) {
      for (var i=0; i < $scope.days.length; i++) {
        if ($scope.days[i]._id === index._id) {
          $scope.days.splice(i,1);
          // console.log('index._id: ', index._id);
          break;
        }
      }
      // console.log('New days array: ', $scope.days);
    };

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.addDay,
        eventClick: $scope.removeDay
      }
    };

  }]);
