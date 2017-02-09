'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', 'calendarFactory', '$rootScope', 'AuthFactory', function ($scope, calendarFactory, $rootScope, AuthFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var days = [];

    if (AuthFactory.isAuthenticated()) {
      $scope.username = AuthFactory.getUsername();
      $scope.userId = AuthFactory.getUserId();
      // $scope.userCalendars = AuthFactory.getCalendars();

      // https://stackoverflow.com/questions/38989253/how-to-display-the-events-fetched-from-database-on-the-full-calendar-angular-js?rq=1
      $scope.days = [function(start, end, timezone, callback) {
          calendarFactory.query({
            // userId: $scope.userId,
            // userCalendars : $scope.userCalendars[0]
          })
          .$promise.then(function(data) {
              angular.forEach(data,function(day){
                  days.push({
                      id: day.id,
                      title: day.title,
                      start: day.start
                  });
              });
              callback(days);
          });
      }];
    }

    $rootScope.$on('login:Successful', function() {

    });

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
        editable: false,
        header:{
          left: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.addDay,
        eventClick: $scope.removeDay
      }
    };

  }]);
