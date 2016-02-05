'use strict'
var app = angular.module('app', []);

app.controller('appCtrl', ['$scope', function($scope){
  $scope.hello = 'world';
}]);

app.directive('appendNode', ['$compile', function ($compile) {
    return {
      link: function (scope, elem, attrs, ctrl) {
        elem.bind('click', function(){
            var nameSpace = attrs.ngM;
           // var index = attrs.appendNode;
               var htmlTemplate = '<div class="other">'
                   + '<input class = "name" type = "text" ng-model="'+nameSpace+'['+index+']'+'.name">'
                   +'<input class="value" type="text" ng-model="'+nameSpace+'['+index+']'+'.value">'
                   +'<button append-node="0" ng-m="'+nameSpace+'['+index+']'+'.src">Add button</button>'
            +'</div>';
            // attrs.appendNode++;
            var a_input = angular.element($compile(htmlTemplate)(scope))

            elem.parent().append(a_input);
        });
      }
    }
  }]);
