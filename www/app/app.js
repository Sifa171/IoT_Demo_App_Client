'use strict';

var myApp = angular.module('myApp', ['ngRoute',
    'ngSanitize',
    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'myApp.filters',
    'snap',
    'fhcloud',
    'ngCookies'
]);

myApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/tasks.html',
            controller: 'MainCtrl'
        })
        .when('/tasks', {
            templateUrl: 'views/tasks.html',
            controller: 'MainCtrl'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MainCtrl'
        })
});
