var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/pets', {
    templateUrl: '/views/pets.html',
    controller: "petController"
  })
  .when('/favPets', {
    templateUrl: '/views/favPets.html',
    controller: "petController"
  })
  .otherwise({
    redirectTo: 'pets'
  });

}]);
