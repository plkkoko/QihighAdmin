'use strict';

angular.module('AceApp').controller('NestableCtrl', ['$scope', function ($scope) {

  $scope.items = [
    {
      item: 'a项目' ,
      children: []
    },
    {
      item: 'b项目' ,
      children: [
        {
          item: 'c项目' ,
          children: []
        },
        {
          item: 'd项目' ,
          children: []
        }
      ]
    },
    {
      item: 'e项目' ,
      children: []
    },
    {
      item: 'f项目' ,
      children: []
    }
  ];

}]);
