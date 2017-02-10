'use strict';

angular.module('frontendApp')
.constant('baseURL', 'http://localhost:3000/api/')

.factory('dayFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    return $resource(baseURL + 'customers/:id/days/:daysId', null, {
            id: '@Id',
            daysId: '@daysId'
        },
        {
        'update': {
            method: 'PUT'
        },
        'query': {
            method: 'GET',
            isArray: true
        }
    });

}])

.factory('$localStorage', ['$window', function($window) {
    return {
        store: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function(key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog) {

    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var userId;
    var userCalendars = [];
    /*TODO When I wsant to display a specific calendar of a user,
      I need to know if this calendar belongs to this user.
      But I need to store the calId in the user to know from the user's view
      which calendars he can access.
      Or I get only calendars with the userId.
      It is easier in the first step to just provide one calendar.
    */
    var authToken;

    function loadUserCredentials() {
        var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
        if (credentials.username !== undefined) {
            useCredentials(credentials);
        }
    }

    function storeUserCredentials(credentials) {
        $localStorage.storeObject(TOKEN_KEY, credentials);
        useCredentials(credentials);
    }

    function useCredentials(credentials) {
        isAuthenticated = true;
        username = credentials.username;
        userId = credentials.userId;
        authToken = credentials.token;

        // Set the token as header for your requests!
        $http.defaults.headers.common['x-access-token'] = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['x-access-token'] = authToken;
        $localStorage.remove(TOKEN_KEY);
    }

    authFac.login = function(loginData) {

        $resource(baseURL + 'customers/login')
            .save(loginData,
                function(response) {
                    storeUserCredentials({
                        username: loginData.username,
                        userId: response.userId,
                        token: response.id
                    });
                    $rootScope.$broadcast('login:Successful');
                },
                function(response) {
                    isAuthenticated = false;

                    var message = '<div class="ngdialog-message">' +
                        '<div><h3>Login Unsuccessful</h3></div>' +
                        '<div><p>' + response.data.err.message + '</p><p>' +
                        response.data.err.name + '</p></div>' +
                        '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>' +
                        '</div>';

                    ngDialog.openConfirm({
                        template: message,
                        plain: 'true'
                    });
                }

            );

    };

    authFac.logout = function() {
        $resource(baseURL + 'customers/logout').get(function() {});
        destroyUserCredentials();
    };

    authFac.register = function(registerData) {

        $resource(baseURL + 'customers/register')
            .save(registerData,
                function() {
                    authFac.login({
                        username: registerData.username,
                        password: registerData.password
                    });
                    if (registerData.rememberMe) {
                        $localStorage.storeObject('userinfo', {
                            username: registerData.username,
                            password: registerData.password
                        });
                    }

                    $rootScope.$broadcast('registration:Successful');
                },
                function(response) {

                    var message = '<div class="ngdialog-message">' +
                        '<div><h3>Registration Unsuccessful</h3></div>' +
                        '<div><p>' + response.data.err.message +
                        '</p><p>' + response.data.err.name + '</p></div>';

                    ngDialog.openConfirm({
                        template: message,
                        plain: 'true'
                    });

                }

            );
    };

    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };

    authFac.getUsername = function() {
        return username;
    };

    authFac.getUserId = function() {
        return userId;
    };

    authFac.getCalendars = function () {
        return userCalendars;
    };

    loadUserCredentials();

    return authFac;

}]);
