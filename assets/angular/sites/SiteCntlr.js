/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//angular.module('SignupModule').controller('SightController',['$scope','$http',function($scope,$http){
angular.module('siteApp',[]).controller('SiteController',['$scope','$http',function($scope,$http){

    $scope.greeting = { text: 'Hello',
    yourName:"JK"};
    $scope.sites = [];
    $http.get("http://localhost:1337/employee/")
    

}]);

