
var shoppingApp = angular.module('shoppingWebsite', ['ngRoute','ngResource','ngCookies']);

shoppingApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: '/app/views/partials/home.html',
                controller: 'MainController'
            }).when('/article/:articleId', {
                templateUrl: '/app/views/partials/article.html'/*,
                controller: 'MainController'*/
            }).when('/shoppingCart', {
                templateUrl: '/app/views/partials/shoppingCart.html'/*,
                controller: 'MainController'*/
            }).when('/checkout', {
                templateUrl: '/app/views/partials/checkout.html'/*,
                controller: 'MainController'*/
            }).when('/orderHistory', {
                templateUrl: '/app/views/partials/orderHistory.html'/*,
                controller: 'MainController'*/
            }).when('/favorites', {
                templateUrl: '/app/views/partials/favorites.html'/*,
                controller: 'MainController'*/
            }).when('/confirmation', {
                templateUrl: '/app/views/partials/confirmation.html'/*,
                controller: 'MainController'*/
            }).otherwise({
                redirectTo: '/home'
            });
    }
]);
