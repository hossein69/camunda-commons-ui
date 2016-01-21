'use strict';

var fs = require('fs');

var angular = require('angular'),
    camCommonsUi = require('../../index'),
    testXML = fs.readFileSync(__dirname + '/test.xml', 'utf8');

var testModule = angular.module('myModule', [camCommonsUi.name]);

testModule.controller('testController', ['$scope', function($scope) {
  $scope.decisionTable = testXML;

  $scope.control = {};
}]);


angular.element(document).ready(function() {
  angular.bootstrap(document.body, [testModule.name]);
});
