'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /* dates */
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [
      {id:1000, title: 'NoMeatEaten',start: new Date(), allDay:true},
      {id:1001, title: 'All Day Event',start: new Date(y, m, 1)},
      {id:1002, title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id:1003, title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false}
    ];

    $scope.eventSources = [$scope.events];

    /* add custom event*/
    $scope.addEvent = function(date) {
      $scope.events.push({
        title: 'NoMeatEaten',
        start: date._d,
        addDay:true
      });
      // console.log(date._d + ' added');
    };

    /* remove event */
    $scope.removeEvent = function(index) {
      for (var i=0; i < $scope.events.length; i++) {
        if ($scope.events[i]._id === index._id) {
          $scope.events.splice(i,1);
          // console.log('index._id: ', index._id);
          break;
        }
      }
      // console.log('New events array: ', $scope.events);
    };

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.addEvent,
        eventClick: $scope.removeEvent
      }
    };

  })
  .controller('ProfileCtrl', function () {

  })
  .controller('LoginCtrl', function () {

  })
;
