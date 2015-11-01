/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('reditApp',['ui.router','compareTo','toastr' ]);
angular.module('reditApp').config(function($stateProvider, $urlRouterProvider) {
    //this router implements the redit project @ https://github.com/angular-ui/ui-router
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            controller: 'UserCntrl',
            templateUrl: 'angular/application/partial_appSplash.ejs'
        })
        .state('userLogin',{
            url: '/login',
            templateUrl: 'angular/application/partial_userLogin.ejs'        
        })
        .state('userCreate',{
            url: '/newUser',
            templateUrl: 'angular/application/partial_userCreate.ejs'        
        })
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
});
angular.module('reditApp').service('sessionState',function(){
   this.sayHello = function(){
       alert("My first session function!");
   } 
});

