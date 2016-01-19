'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = new Firebase("https://seangeleno-contacts.firebaseio.com/contacts");

  $scope.contacts = $firebaseArray(ref);
  // console.log($scope.contacts);

  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }
  $scope.hide = function(){
    $scope.addFormShow = false;
  }

  $scope.addFormSubmit = function() {
    console.log('Adding Contact...');
  }
}]);
