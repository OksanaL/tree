'use strict';

/* App Module */

var treeApp = angular.module('treeApp', [
    'ngRoute',
    'treeControllers',
    'treeDirectives'
]);

treeApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/tree', {
            templateUrl: 'partials/ngTree.html',
            controller: 'ComposerEditor'
        }).
        otherwise({
           redirectTo: '/tree'
        });
    }

]);