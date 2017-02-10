'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('MainCtrl', ['$scope', 'customerFactory', 'dayFactory', '$rootScope', 'AuthFactory', function ($scope, customerFactory, dayFactory, $rootScope, AuthFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var fullcalendar = angular.element(document.getElementById('uiCalendar'));
    var days = [];

    function getUserDays() {
        if (AuthFactory.isAuthenticated()) {
            $scope.username = AuthFactory.getUsername();
            $scope.customerId = AuthFactory.getUserId();
            // https://goo.gl/IYCGhe
                customerFactory.query({
                    id: $scope.customerId
                })
                .$promise.then(
                    function(data) {
                        angular.forEach(data,function(newDay){
                            days.push(newDay);
                            fullcalendar.fullCalendar('renderEvent',newDay);
                        });
                    },
                    function (response) {
                        console.log('error: ', response);
                    }
                );

        }

    }
    getUserDays();


    $rootScope.$on('login:Successful', function() {
        //TODO execute when login successful
        getUserDays();
    });

    $rootScope.$on('logout:Successful', function() {
        fullcalendar.fullCalendar('removeEvents');
        console.log('Logout successful');
    });

    /* add day*/
    $scope.addDay = function(date) {

        //TODO read day from fullcalendar to get rid of car days
        for (var i = 0; i < days.length; i++) {
            if (date._d.getTime() === (new Date(days[i].start).getTime())) {
                return console.log('Date already exists');
            }
        }

        //TODO save newDay in MongoDB
        var newDay = {
            start: date._d,
            allDay: true,
            customerId: $scope.customerId
        };

        dayFactory.save(newDay);
        days.push(newDay);
        fullcalendar.fullCalendar('renderEvent', newDay, true);
        console.log('Added day ', newDay);
    };

    /* remove day */
    $scope.removeDay = function(index) {
        //TODO remove removeDay from MongoDB

        for (var i=0; i < days.length; i++) {
            if ((new Date(days[i].start).getTime()) === index.start._d.getTime()) {
                days.splice(i,1);
                break;
            }
        }

        dayFactory.delete(index._id);
        fullcalendar.fullCalendar('removeEvents',index._id);
        console.log('Removed day ', index);
    };

    $scope.uiCalendarConfig = {
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
