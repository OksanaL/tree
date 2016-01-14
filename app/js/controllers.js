'use strict';

/* Controllers */

var treeControllers = angular.module('treeControllers', []);

treeControllers.controller('ComposerEditor', ['$scope', function ($scope) {

    $scope.json = {
        "Name": "Joe",
        "Last Name": "Miller",
        "Address": {
            "Street": {
                "Street name": "Neverland",
                "Number": "42"
            }
        },
        "Hobbies": [
            {
                'favorite' : [
                    "play footbal"
                ],
                'not favorite' :  [
                    "bascetball",
                    "cimchi"
                ]
            },
            {
                'favorite' : [
                    "play footbal"
                ],
                'not favorite': [
                    "bascetball"
                ]
            },
            "dreaming",
            "listening"
        ],
    }

    $scope.getTypeOf = function(value) {
        if(value === null) {
            return "null";
        }
        if(Array.isArray(value)) {
            return "array";
        }
        return typeof value;
    };
    /*$scope.jsonItem = function(path, miss, delim) {
        return getItem($scope.json, path, miss, delim);
    };

    $scope.addItem = function(path, value) {

    };

    $scope.removeItem = function(path) {

    };

    $scope.reset = function(contact) {
        $scope.json = {};
    };*/
}]);