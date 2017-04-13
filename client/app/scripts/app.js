'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.calendar',
    'ui.router',
    'ngDialog'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    // route for the home page
    .state('app', {
        url: '/',
        views: {
            'header': {
                templateUrl: 'views/header.html',
                controller: 'HeaderCtrl'
            },
            'content': {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            },
            'footer': {
                templateUrl: 'views/footer.html',
            }
        }
    })

    // route for the about page
    .state('app.about', {
        url: 'about',
        views: {
            'content@': {
                templateUrl: 'views/about.html'
            }
        }
    })

    // route for the about page
    .state('app.profile', {
        url: 'profile',
        views: {
            'content@': {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    ;

    $urlRouterProvider.otherwise('/');

  });
