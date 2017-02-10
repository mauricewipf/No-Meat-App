'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('MainCtrl', ['$scope', 'dayFactory', '$rootScope', 'AuthFactory', function ($scope, dayFactory, $rootScope, AuthFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var days = [];

    function getUserDays() {
        if (AuthFactory.isAuthenticated()) {
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
            // https://goo.gl/IYCGhe
            $scope.days = [function(start, end, timezone, callback) {
                dayFactory.query({
                    id: $scope.userId
                    // userCalendars : $scope.userCalendars[0]
                })
                .$promise.then(
                    function(data) {
                        angular.forEach(data,function(day){
                            days.push({
                                id: day.id,
                                title: day.title,
                                start: day.start
                            });
                        });
                        callback(days);
                    },
                    function (response) {
                        console.log('error: ', response);
                    }
                );
            }];
        }

    }
    getUserDays();


    $rootScope.$on('login:Successful', function() {
        //TODO execute when login successful
        getUserDays();
    });

    /* add day*/
    $scope.addDay = function(date) {
        //TODO update addDay function
        for (var i = 0; i < days.length; i++) {
            if (date._d.getTime() === (new Date(days[i].start).getTime())) {
                return console.log('Date already exists');
            }
        }
        days.push({
            start: date._d
        });
        console.log(days);
    };

    /* remove day */
    $scope.removeDay = function(index) {
        //TODO update removeDay function
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
