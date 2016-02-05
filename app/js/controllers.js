'use strict';

/* Controllers */

var treeControllers = angular.module('treeControllers', []);

treeControllers.controller('ComposerEditor', ['$scope', function ($scope) {
    //$scope.json = {"a": 10, "b":  {"a": {"s": 22}, "d": 33}};

    $scope.json = {
        value: "Joe",
        id: 0,
        path: '',
        nodes: [
            //{
            //    value: "Mike",
            //    id: '11',
            //    nodes: []
            //},
            //{
            //    value: "Leo",
            //    id: '12',
            //    nodes: [
            //        {
            //            value: "John",
            //            id: '121',
            //            nodes: []
            //        }
            //    ]
            //},
            //{
            //    value: "Shon",
            //    id: '13',
            //    nodes: []
            //}
        ]
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
*/
    $scope.addItem = function(item) {
        //var length = item.nodes.length
        var nextNodeId = item.nodes.length;
        item.nodes.push({
            value: "123",
            id: nextNodeId,
            path: item.path + (item.path != '' ? '['+item.id+'].nodes' : 'nodes'),
            nodes: []
        });
    };

    $scope.removeItem = function(item) {
        var path = item.path;
        console.log("$scope.json." + path + ".splice("+item.id+", 1)");
        eval("$scope.json." + path + ".splice("+item.id+", 1)");
    };
/*
    $scope.reset = function(contact) {
        $scope.json = {};
    };*/
}]);