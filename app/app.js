
var shoppingApp = angular.module('shoppingWebsite', ['ngRoute','ngResource','ngCookies']);

shoppingApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: '/views/partials/home.html',
                controller: 'MainController'
            }).otherwise({
                redirectTo: '/home'
            });
    }
]);
