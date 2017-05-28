'use strict';

angular.module('app').config(['$routeProvider', function config($routeProvider) {

    $routeProvider.
        when('/sign-up', {
            template: '<sign-up></sign-up>'
        }).
        when('/users', {
            template: '<users></users>'
        }).
        when('/user/:userId', {
            template: '<user></user>'
        }).
        when('/posts', {
            template: '<posts></posts>'
        }).
        when('/post/:id', {
            template: '<post></post>'
        }).
        when('/new-post',{
            template: '<new-post></new-post>'
        }).
        otherwise('/');
}]);