'use strict';

angular.module('AceApp').controller('NestableCtrl', ['$scope', function ($scope) {

  $scope.items = [
    {
      item: 'a' ,
      children: []
    },
    {
      item: 'b' ,
      children: [
        {
          item: 'c' ,
          children: []
        },
        {
          item: 'd' ,
          children: []
        }
      ]
    },
    {
      item: 'e' ,
      children: []
    },
    {
      item: 'f' ,
      children: []
    }
  ];

}]);
